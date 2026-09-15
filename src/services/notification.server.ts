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

// SECURITY: reads server-only env vars (no VITE_ prefix) so the webhook URL
// and shared secret never ship to the client bundle. Call only from server
// functions / server routes.
export async function sendZaloRsvpNotification(data: RsvpNotificationPayload): Promise<boolean> {
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
