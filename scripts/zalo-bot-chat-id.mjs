// Lists the chat ids of people who have messaged your Zalo bot, so they can be put in
// the ZALO_BOT_CHAT_IDS secret. Usage (after each recipient sends the bot any message):
//   node scripts/zalo-bot-chat-id.mjs <BOT_TOKEN> [--test]
// --test also sends a test message to every chat found.
const [token, flag] = process.argv.slice(2);
if (!token) {
  console.error("Usage: node scripts/zalo-bot-chat-id.mjs <BOT_TOKEN> [--test]");
  process.exit(1);
}
const api = (method, body) =>
  fetch(`https://bot-api.zaloplatforms.com/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body ?? {}),
  }).then((r) => r.json());

const me = await api("getMe");
if (!me.ok) {
  console.error("Token không hợp lệ:", JSON.stringify(me));
  process.exit(1);
}
console.log("Bot:", me.result?.account_name ?? me.result?.display_name ?? JSON.stringify(me.result));

const updates = await api("getUpdates", { timeout: 5 });
if (!updates.ok) {
  console.error("getUpdates lỗi (nếu đã đặt webhook thì phải xoá webhook trước):", JSON.stringify(updates));
  process.exit(1);
}
const items = Array.isArray(updates.result) ? updates.result : updates.result ? [updates.result] : [];
const chats = new Map();
for (const u of items) {
  const m = u.message ?? u;
  if (m?.chat?.id) chats.set(m.chat.id, m.from?.display_name ?? m.from?.name ?? "");
}
if (chats.size === 0) {
  console.log("Chưa thấy tin nhắn nào. Mở Zalo bằng số điện thoại cần nhận thông báo, nhắn cho bot 1 tin bất kỳ, rồi chạy lại.");
  process.exit(0);
}
for (const [id, name] of chats) console.log(`chat_id: ${id}   (${name})`);
console.log(`\nZALO_BOT_CHAT_IDS=${[...chats.keys()].join(",")}`);

if (flag === "--test") {
  for (const id of chats.keys()) {
    const r = await api("sendMessage", { chat_id: id, text: "✅ Thử nghiệm: thông báo xác nhận tham dự đám cưới sẽ gửi về đây." });
    console.log(id, r.ok ? "đã gửi tin thử" : `lỗi: ${JSON.stringify(r)}`);
  }
}
