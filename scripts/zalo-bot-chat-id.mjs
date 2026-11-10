// Lists the chat ids of people who have messaged your Zalo bot, so they can be put in
// the ZALO_BOT_CHAT_IDS secret. Usage (after each recipient sends the bot any message):
//   node scripts/zalo-bot-chat-id.mjs <BOT_TOKEN> [--test]
// --test also sends a test message to every chat found.
const [token, flag] = process.argv.slice(2);

const api = (method, body) =>
  fetch(`https://bot-api.zaloplatforms.com/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body ?? {}),
  }).then((r) => r.json());

async function main() {
  if (!token) {
    console.error("Usage: node scripts/zalo-bot-chat-id.mjs <BOT_TOKEN> [--test]");
    return 1;
  }

  const me = await api("getMe");
  if (!me.ok) {
    console.error("Token không hợp lệ:", JSON.stringify(me));
    return 1;
  }
  console.log(`Bot: ${me.result?.display_name ?? ""} (${me.result?.account_name ?? me.result?.id})`);

  // Zalo only delivers a message to a getUpdates call that is already waiting when it is
  // sent (messages sent earlier are not queued), so long-poll for 2 minutes while the
  // recipients message the bot. 408 just means nothing arrived during that poll.
  console.log("Đang chờ tin nhắn trong 2 phút: mở Zalo của từng số cần nhận thông báo và nhắn cho bot ngay bây giờ...");
  const chats = new Map();
  const deadline = Date.now() + 120_000;
  while (Date.now() < deadline) {
    const updates = await api("getUpdates", { timeout: "30" });
    if (!updates.ok) {
      if (updates.error_code === 408) continue;
      console.error("getUpdates lỗi (nếu đã đặt webhook thì phải xoá webhook trước):", JSON.stringify(updates));
      return 1;
    }
    const items = Array.isArray(updates.result) ? updates.result : updates.result ? [updates.result] : [];
    for (const u of items) {
      const m = u.message ?? u;
      const name = m?.from?.display_name ?? m?.from?.name ?? "";
      if (m?.chat?.id && !chats.has(m.chat.id)) console.log(`  + ${name}: ${m.chat.id}`);
      if (m?.chat?.id) chats.set(m.chat.id, name);
    }
  }

  if (chats.size === 0) {
    console.log(
      "Không nhận được tin nhắn nào trong 2 phút. Chạy lại lệnh, rồi nhắn cho bot trong lúc lệnh đang chờ.",
    );
    return 0;
  }
  for (const [id, name] of chats) console.log(`chat_id: ${id}   (${name})`);
  console.log(`\nZALO_BOT_CHAT_IDS=${[...chats.keys()].join(",")}`);

  if (flag === "--test") {
    for (const id of chats.keys()) {
      const r = await api("sendMessage", {
        chat_id: id,
        text: "✅ Thử nghiệm: thông báo xác nhận tham dự đám cưới sẽ gửi về đây.",
      });
      console.log(id, r.ok ? "đã gửi tin thử" : `lỗi: ${JSON.stringify(r)}`);
    }
  }
  return 0;
}

// exitCode instead of process.exit(): exiting with fetch sockets still open crashes Node on Windows.
process.exitCode = await main();
