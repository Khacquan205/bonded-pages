import fs from "node:fs";
import { Zalo, LoginQRCallbackEventType } from "zca-js";
import { createClient } from "@supabase/supabase-js";

const credentialsPath = new URL("../credentials.json", import.meta.url);
const SESSION_ROW_ID = "zalo-notify-bot";

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

// Hosts without a persistent disk (e.g. Render free tier) wipe local files on
// restart, so the session is persisted in Supabase when configured. Falls
// back to a local JSON file for simple local testing without Supabase.
async function readCredentials() {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("bot_sessions")
      .select("credentials")
      .eq("id", SESSION_ROW_ID)
      .maybeSingle();
    if (error) {
      console.warn("Không đọc được session từ Supabase:", error.message);
      return null;
    }
    return data?.credentials ?? null;
  }

  if (!fs.existsSync(credentialsPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(credentialsPath, "utf-8"));
  } catch {
    return null;
  }
}

async function saveCredentials(credentials) {
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase
      .from("bot_sessions")
      .upsert({ id: SESSION_ROW_ID, credentials, updated_at: new Date().toISOString() });
    if (error) throw new Error(`Không lưu được session vào Supabase: ${error.message}`);
    return;
  }

  fs.writeFileSync(credentialsPath, JSON.stringify(credentials, null, 2), "utf-8");
}

function isValidCredentials(credentials) {
  return !!(credentials && credentials.cookie && credentials.imei && credentials.userAgent);
}

// Logs in with the saved session if present, otherwise falls back to an
// interactive QR scan (only needed once — the resulting session is saved
// for every future run/restart).
export async function login() {
  const zalo = new Zalo();
  const saved = await readCredentials();

  if (isValidCredentials(saved)) {
    return zalo.login(saved);
  }

  console.log("Chưa có session đã lưu — quét mã QR để đăng nhập.");
  const api = await zalo.loginQR({}, async (event) => {
    switch (event.type) {
      case LoginQRCallbackEventType.QRCodeGenerated:
        await event.actions.saveToFile("./qr.png");
        console.log("Đã lưu mã QR tại ./qr.png — mở file này và quét bằng app Zalo.");
        break;
      case LoginQRCallbackEventType.QRCodeExpired:
        console.log("Mã QR hết hạn, đang tạo mã mới...");
        break;
      case LoginQRCallbackEventType.QRCodeScanned:
        console.log("Đã quét mã, đang chờ xác nhận đăng nhập trên điện thoại...");
        break;
      case LoginQRCallbackEventType.QRCodeDeclined:
        console.log("Đăng nhập bị từ chối trên điện thoại.");
        break;
    }
  });

  const context = api.getContext();
  await saveCredentials({
    cookie: context.cookie.toJSON()?.cookies || [],
    imei: context.imei,
    userAgent: context.userAgent,
  });
  console.log("Đăng nhập thành công, đã lưu session.");
  return api;
}
