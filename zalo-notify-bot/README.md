# zalo-notify-bot

Service nhỏ, chạy 24/7, nhận webhook từ website cưới (`bonded-pages`) mỗi khi
có khách RSVP, rồi gửi tin nhắn Zalo cho cô dâu/chú rể.

Bot đăng nhập bằng **chính tài khoản Zalo của bạn** và gửi thông báo vào mục
**"Cloud của tôi"** (ghi chú riêng, chỉ mình bạn thấy) — không cần acc Zalo
phụ, không cần số điện thoại thứ hai.

> ⚠️ Vì dùng tài khoản Zalo chính bạn dùng hằng ngày: đây là thư viện không
> chính thức (`zca-js`), Zalo có thể thay đổi giao thức bất kỳ lúc nào khiến
> bot ngừng hoạt động, hoặc (hiếm) khoá tài khoản. Nếu sau này bạn có SIM phụ,
> nên đổi sang chạy `npm run login` với tài khoản phụ để giảm rủi ro cho acc
> chính — code không cần đổi gì, chỉ cần đăng nhập lại bằng acc khác. Khi đó
> tự đổi `selfThreadId` trong `src/server.js` thành uid của tài khoản chính
> (dùng `api.findUser(phoneNumber)` để lấy uid).

## 1. Setup local (test trước khi đưa lên VM)

```bash
npm install
cp .env.example .env
npm run login
```

`npm run login` sẽ tạo file `qr.png` ở thư mục gốc — mở file này và quét bằng
app Zalo **trên điện thoại đang đăng nhập tài khoản chính của bạn**. Sau khi
quét xong, session được lưu vào `credentials.json` (không commit file này lên
git — đã có trong `.gitignore`), các lần chạy sau không cần quét QR nữa.

Đặt `WEBHOOK_SECRET` trong `.env` là một chuỗi ngẫu nhiên dài (vd.
`openssl rand -hex 32`).

Deploy lên Render (bước 2) không có ổ đĩa bền vững, nên cần điền thêm
`SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` (project Supabase của bạn, lấy ở
Project Settings → API) để session được lưu vào Supabase thay vì file cục bộ
— sống sót qua các lần Render service ngủ/thức dậy. Bỏ trống 2 biến này thì
bot chỉ lưu ra `credentials.json` cục bộ (đủ dùng khi test ở máy local).

Chạy thử server:

```bash
npm start
```

Test webhook:

```bash
curl -X POST http://localhost:8787/notify \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: <giá trị WEBHOOK_SECRET>" \
  -d '{"message":"Test tin nhắn từ bot"}'
```

Mở app Zalo, vào mục "Cloud của tôi" — thấy tin nhắn test vừa gửi là hoạt động đúng.

## 2. Deploy lên Render (free tier)

### Chuẩn bị Supabase (lưu session để sống sót qua restart)

1. Vào Supabase Dashboard → project của bạn → **SQL Editor**, chạy nội dung
   file [`../bonded-pages/supabase/migrations/20260824080000_bot_sessions.sql`](../bonded-pages/supabase/migrations/20260824080000_bot_sessions.sql)
   để tạo bảng `bot_sessions` (bảng riêng cho session bot, không cấp quyền
   cho `anon`/`authenticated`, chỉ service role đọc/ghi được).
2. Vào **Project Settings → API**, copy `Project URL` và `service_role`
   key (secret — không share, không commit).

### Đẩy code lên GitHub

Render deploy từ Git repo. Tạo 1 repo GitHub **riêng, để Private** cho
`zalo-notify-bot` (không gộp vào repo `bonded-pages` — tách bạch cho rõ ràng,
dù `credentials.json`/`.env` đã nằm trong `.gitignore` nên sẽ không bị lộ dù
gộp chung):

```bash
cd zalo-notify-bot
git init
git add .
git commit -m "Init zalo-notify-bot"
gh repo create zalo-notify-bot --private --source=. --push
```

(Hoặc tạo repo thủ công trên github.com rồi `git remote add origin ... && git push`.)

### Tạo Web Service trên Render

1. [dashboard.render.com](https://dashboard.render.com) → **New** → **Web Service**.
2. Connect tới repo `zalo-notify-bot` vừa đẩy lên.
3. Cấu hình:
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free
4. Mục **Environment Variables**, thêm:
   ```
   WEBHOOK_SECRET=<giá trị đã dùng lúc test local>
   SUPABASE_URL=<project url>
   SUPABASE_SERVICE_ROLE_KEY=<service role key>
   ```
   (`PORT` Render tự set, không cần thêm.)
5. Deploy. Render build xong sẽ tự chạy `npm start` → bot login bằng session
   đã lưu trong Supabase (không cần quét QR lại, vì máy local đã login và
   lưu session vào Supabase rồi — xem bước dưới).

### Đưa session đã login từ máy local lên Supabase (chỉ cần làm 1 lần)

Máy local của bạn hiện đang login rồi (`credentials.json` đã có). Để Render
dùng lại session này mà không cần quét QR lần nữa: điền `SUPABASE_URL` +
`SUPABASE_SERVICE_ROLE_KEY` vào `.env` cục bộ, rồi chạy:

```bash
npm run migrate-session
```

Sau đó Render sẽ tự đọc được session này khi start, không cần quét QR trên
Render.

### Cấu hình phía website cưới (Cloudflare Pages/Workers → Settings → Variables and Secrets)

Render cấp sẵn 1 URL dạng `https://zalo-notify-bot-xxxx.onrender.com` (xem
trong dashboard sau khi deploy xong):

```
ZALO_BOT_WEBHOOK_URL=https://zalo-notify-bot-xxxx.onrender.com/notify
ZALO_BOT_WEBHOOK_SECRET=<giống hệt WEBHOOK_SECRET đã đặt trên Render>
```

### Lưu ý về độ trễ "thức dậy"

Free tier Render tự ngủ sau ~15 phút không có request. Lần RSVP đầu tiên sau
một khoảng im lặng dài sẽ mất thêm 30-50 giây để Render khởi động lại service
trước khi gửi được tin Zalo — chấp nhận được vì RSVP không cần tức thời
tuyệt đối, khách vẫn thấy xác nhận thành công ngay trên web (thông báo Zalo
là phụ, gửi ngầm ở backend).

## Lưu ý rủi ro

- Đây là thư viện **không chính thức** (`zca-js`), reverse-engineer giao thức
  Zalo. Zalo có thể thay đổi giao thức bất kỳ lúc nào khiến bot ngừng hoạt
  động, hoặc trong trường hợp xấu, khoá tài khoản. Vì bot đăng nhập bằng
  **tài khoản Zalo chính** bạn dùng hằng ngày, nếu điều đó xảy ra sẽ ảnh
  hưởng trực tiếp đến bạn — đây là đánh đổi bạn đã chọn để khỏi cần SIM phụ.
- Nếu bot ngừng gửi được tin, kiểm tra log bằng `pm2 logs zalo-notify-bot` —
  khả năng cao cần đăng nhập lại (xoá `credentials.json`, chạy lại
  `npm run login`).
