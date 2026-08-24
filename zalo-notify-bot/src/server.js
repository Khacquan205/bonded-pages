import "dotenv/config";
import express from "express";
import { ThreadType } from "zca-js";
import { login } from "./auth.js";

const PORT = process.env.PORT || 8787;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

if (!WEBHOOK_SECRET) {
  console.error("Thiếu WEBHOOK_SECRET trong .env — dừng lại để tránh mở webhook công khai không bảo vệ.");
  process.exit(1);
}

const api = await login();
const ctx = api.getContext();
// "Cloud của tôi" (self-notes) thread id — Zalo gọi nó là send2me_id.
const selfThreadId = ctx.loginInfo?.send2me_id || ctx.uid;

if (!selfThreadId) {
  console.error("Không lấy được self-thread id từ context đăng nhập — thử đăng nhập lại (xoá credentials.json).");
  process.exit(1);
}

console.log("Bot Zalo đã sẵn sàng, sẽ gửi thông báo vào Cloud của tôi (self-thread:", selfThreadId, ")");

const app = express();
app.use(express.json());

app.post("/notify", async (req, res) => {
  const providedSecret = req.header("x-webhook-secret");
  if (providedSecret !== WEBHOOK_SECRET) {
    return res.status(401).json({ ok: false, error: "Unauthorized" });
  }

  const message = typeof req.body?.message === "string" ? req.body.message : null;
  if (!message) {
    return res.status(400).json({ ok: false, error: "Missing 'message' field" });
  }

  try {
    await api.sendMessage(message, selfThreadId, ThreadType.User);
    res.json({ ok: true });
  } catch (error) {
    console.error("Gửi tin nhắn Zalo thất bại:", error);
    res.status(502).json({ ok: false, error: "Failed to send Zalo message" });
  }
});

app.get("/health", (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Zalo notify bot đang lắng nghe tại port ${PORT}`);
});
