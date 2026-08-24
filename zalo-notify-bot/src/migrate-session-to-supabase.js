import "dotenv/config";
import fs from "node:fs";
import { createClient } from "@supabase/supabase-js";

// One-time helper: pushes the local credentials.json (from `npm run login`)
// into Supabase, so a host without persistent disk (Render) can reuse the
// same session without a second QR scan. Run once after setting
// SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env.
const credentialsPath = new URL("../credentials.json", import.meta.url);

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Thiếu SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY trong .env");
  process.exit(1);
}
if (!fs.existsSync(credentialsPath)) {
  console.error("Không tìm thấy credentials.json — chạy `npm run login` trước.");
  process.exit(1);
}

const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf-8"));
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const { error } = await supabase
  .from("bot_sessions")
  .upsert({ id: "zalo-notify-bot", credentials, updated_at: new Date().toISOString() });

if (error) {
  console.error("Lỗi khi đưa session lên Supabase:", error.message);
  process.exit(1);
}

console.log("Đã đưa session lên Supabase — Render giờ có thể dùng lại session này.");
