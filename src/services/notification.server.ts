import { wedding } from "@/config/wedding";

export interface RsvpNotificationPayload {
  name: string;
  attendance: "yes" | "no";
  guestCount: number;
  side: "both" | "bride" | "groom";
  note?: string | null;
  createdAt?: string;
}

function buildMessageText(data: RsvpNotificationPayload): string {
  const sideName =
    data.side === "bride"
      ? `Nhà gái (${wedding.couple.bride.shortName})`
      : data.side === "groom"
        ? `Nhà trai (${wedding.couple.groom.shortName})`
        : "Cả hai bên";

  const attendanceStatus =
    data.attendance === "yes"
      ? `✅ Sẽ tham dự (${data.guestCount} người)`
      : `❌ Rất tiếc, báo vắng mặt`;

  const timeString = data.createdAt
    ? new Date(data.createdAt).toLocaleString("vi-VN")
    : new Date().toLocaleString("vi-VN");

  return [
    `🔔 [THÔNG BÁO XÁC NHẬN THAM DỰ ĐÁM CƯỚI]`,
    `👤 Khách mời: ${data.name}`,
    `✨ Trạng thái: ${attendanceStatus}`,
    `🌸 Phía khách: ${sideName}`,
    data.note ? `💌 Lời nhắn: "${data.note}"` : `💌 Lời nhắn: (Không có)`,
    `⏰ Thời gian: ${timeString}`,
  ].join("\n");
}

function getServerEnv(key: string): string | undefined {
  const g = globalThis as Record<string, unknown>;
  const cfEnv = g.__env__ as Record<string, unknown> | undefined;
  return (
    (typeof cfEnv?.[key] === "string" ? (cfEnv[key] as string) : undefined) ??
    (typeof process !== "undefined" && typeof process.env?.[key] === "string" ? process.env[key] : undefined) ??
    (typeof g[key] === "string" ? (g[key] as string) : undefined)
  );
}

const ZALO_BOT_API = "https://bot-api.zaloplatforms.com";

/**
 * Official Zalo Bot Platform (bot.zapps.me): a plain HTTPS call, so it works straight from the
 * Cloudflare worker with no always-on bot server. Needs two server secrets:
 *   ZALO_BOT_TOKEN     token sent by "Zalo Bot Manager" when the bot is created
 *   ZALO_BOT_CHAT_IDS  comma-separated chat ids of the people to notify (each person must send
 *                      the bot one message first; get ids with scripts/zalo-bot-chat-id.mjs)
 * Returns null when not configured, so the caller can fall back to the legacy webhook.
 */
async function sendViaZaloBot(text: string): Promise<boolean | null> {
  const token = getServerEnv("ZALO_BOT_TOKEN");
  const chatIds = (getServerEnv("ZALO_BOT_CHAT_IDS") ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
  if (!token || chatIds.length === 0) return null;

  const results = await Promise.all(
    chatIds.map(async (chatId) => {
      try {
        const response = await fetch(`${ZALO_BOT_API}/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text: text.slice(0, 2000) }),
          signal: AbortSignal.timeout(10000),
        });
        const body = (await response.json().catch(() => null)) as { ok?: boolean } | null;
        if (!response.ok || body?.ok !== true) {
          console.error("❌ [Zalo Bot] sendMessage failed:", response.status, JSON.stringify(body));
          return false;
        }
        return true;
      } catch (error) {
        console.error("❌ [Zalo Bot] sendMessage error:", error);
        return false;
      }
    }),
  );
  return results.some(Boolean);
}

// SECURITY: reads server-only env vars (no VITE_ prefix) so the bot token, webhook URL
// and shared secret never ship to the client bundle. Call only from server
// functions / server routes.
export async function sendZaloRsvpNotification(data: RsvpNotificationPayload): Promise<boolean> {
  const viaBot = await sendViaZaloBot(buildMessageText(data));
  if (viaBot !== null) return viaBot;

  const webhookUrl = getServerEnv("ZALO_BOT_WEBHOOK_URL");
  const webhookSecret = getServerEnv("ZALO_BOT_WEBHOOK_SECRET");

  const g = globalThis as Record<string, unknown>;
  const cfEnv = g.__env__ as Record<string, unknown> | undefined;
  console.log(
    "🔍 [Zalo debug] webhookUrl:", webhookUrl ? "FOUND" : "MISSING",
    "| webhookSecret:", webhookSecret ? "FOUND" : "MISSING",
    "| cfEnv keys:", cfEnv ? Object.keys(cfEnv).join(", ") : "none",
    "| process.env keys:", typeof process !== "undefined" && process.env ? Object.keys(process.env).join(", ") : "none",
  );

  if (!webhookUrl) {
    console.log("ℹ️ [Zalo Bot Notification Preview]:\n" + buildMessageText(data));
    return false;
  }

  const messageText = buildMessageText(data);
  const timeString = data.createdAt
    ? new Date(data.createdAt).toLocaleString("vi-VN")
    : new Date().toLocaleString("vi-VN");

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(webhookSecret ? { "x-webhook-secret": webhookSecret } : {}),
      },
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify({
        recipient_phone: getServerEnv("ZALO_NOTIFY_RECIPIENT_PHONE"),
        groom_name: wedding.couple.groom.name,
        message: messageText,
        data: {
          guest_name: data.name,
          attendance: data.attendance,
          guest_count: data.guestCount,
          side: data.side,
          note: data.note,
          time: timeString,
        },
      }),
    });

    console.log("📡 [Zalo Bot response status]:", response.status, response.statusText);
    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      console.error("❌ [Zalo Bot error body]:", errText);
    }
    return response.ok;
  } catch (error) {
    console.error("Lỗi khi gửi webhook Zalo bot:", error);
    return false;
  }
}
