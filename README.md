# Love Story Invite

# WEDDING INVITATION WEBSITE — [CÔ DÂU] & [CHÚ RỂ]

## 1. Mục tiêu

Website thiệp cưới one-page, mobile-first, song ngữ Việt–Anh, dùng để gửi link cho khách mời qua Zalo.

Điểm khác biệt quan trọng: **KHÔNG có form RSVP**. Mọi CTA "Xác nhận tham dự" là link mở thẳng cuộc trò chuyện Zalo cá nhân của cô dâu hoặc chú rể.

## 2. Tech stack

- React + Vite + TypeScript

- Tailwind CSS + shadcn/ui

- framer-motion (scroll animation)

- lucide-react (icon)

- Supabase (CHỈ dùng cho sổ lưu bút — không auth, không user account)

## 3. Kiến trúc dữ liệu (BẮT BUỘC)

Tạo `src/config/wedding.ts` export một object duy nhất chứa TOÀN BỘ nội dung.

Mọi chuỗi text đều ở dạng song ngữ:

```ts

export const wedding = {

  couple: {

    bride: { name: "...", shortName: "...", zalo: "https://zalo.me/0901234567", avatar: "..." },

    groom: { name: "...", shortName: "...", zalo: "https://zalo.me/0907654321", avatar: "..." },

  },

  date: { ceremony: "2026-11-14T09:00:00+07:00", reception: "2026-11-15T17:00:00+07:00" },

  rsvpDeadline: "2026-10-01",

  venue: { name: "...", address: { vi: "...", en: "..." }, mapsUrl: "...", embedUrl: "..." },

  story: { intro: { vi: "...", en: "..." }, bride: {...}, groom: {...} },

  timeline: [ /* 2 ngày, mỗi ngày mảng các mốc { time, title: {vi,en}, desc: {vi,en}, location } */ ],

  gallery: ["...", "..."],

  music: { src: "/audio/bg.mp3", title: "..." },

  theme: { /* các mã màu, xem mục 4 */ },

}

```

Không hardcode nội dung trong component. Đổi file này là ra được thiệp cưới cho cặp đôi khác.

## 4. Song ngữ (i18n)

- Tạo `LanguageContext` với state `'vi' | 'en'`, mặc định `'vi'`, lưu vào `localStorage`.

- Hook `useT()` trả về hàm nhận object `{vi, en}` và trả chuỗi theo ngôn ngữ hiện tại.

- Toggle ngôn ngữ ở navbar: dạng text nhỏ `VI / EN`, không dùng cờ quốc gia.

- Cập nhật thuộc tính `lang` của thẻ `<html>` khi đổi ngôn ngữ.

- Ngày tháng format theo locale: tiếng Việt "Chủ nhật, 15 tháng 11, 2026" — tiếng Anh "Sunday, November 15, 2026".

## 5. Design system

**Bảng màu — trắng kem + xanh olive/eucalyptus:**

```

--cream:       #FAF7F0   /* nền chính */

--cream-deep:  #F1EBE0   /* nền section xen kẽ */

--olive:       #6B7355   /* màu chủ đạo, nút primary */

--olive-deep:  #4A5240   /* heading, hover */

--eucalyptus:  #A8B5A0   /* accent nhạt, divider, icon */

--sage-mist:   #DCE3D6   /* nền card, badge */

--text:        #2E332B

--text-muted:  #6E7268

```

Nút Zalo giữ nguyên brand `#0068FF` — đây là ngoại lệ có chủ đích để khách nhận ra ngay.

**Phong cách:** tối giản, hiện đại, nhiều khoảng trắng, ảnh lớn tràn viền, cảm giác airy và ấm.

Tránh hoàn toàn: gradient tím-xanh, glassmorphism, neon, emoji trong UI, shadow đậm.

**Typography:**

- Heading: Cormorant Garamond, weight 300–400, letter-spacing rộng, viết hoa cho label nhỏ

- Body: Be Vietnam Pro (bắt buộc — hỗ trợ đầy đủ dấu tiếng Việt)

- Load subset `vietnamese` + `latin` từ Google Fonts

**Chi tiết:** bo góc nhỏ (4–8px), border 1px `--eucalyptus`, divider là đường kẻ mảnh cắt ngang bởi icon lá eucalyptus SVG nhỏ.

**Motion:** fade-in + translate-y 20px khi vào viewport, 600ms, ease-out. Nhẹ nhàng, không bounce.

## 6. Cấu trúc trang (one-page, scroll + anchor nav)

### Navbar

Sticky. Trong suốt khi ở hero → nền kem + border-bottom mảnh khi scroll.

Monogram 2 chữ cái đầu · Menu: Chuyện chúng mình / Thông tin / Chương trình / Album / Lưu bút · Toggle `VI/EN` · Nút CTA "Nhắn tin xác nhận".

Mobile: hamburger → full-screen overlay.

### 1. Hero

Ảnh cưới full-viewport, overlay đen 25%. Label nhỏ "Save the date" → tên cặp đôi cỡ rất lớn → ngày cưới → **countdown** (ngày/giờ/phút/giây, style tối giản) → 2 nút: `Nhắn tin xác nhận` (primary) và `Lưu vào lịch` (outline). Mũi tên scroll ở đáy.

### 2. Chuyện chúng mình

2 cột lệch (ảnh trái / text phải), đảo chiều ở block sau. Đoạn intro chung, rồi 2 block "Về [Cô dâu]" và "Về [Chú rể]". Mobile xếp dọc.

### 3. Thông tin sự kiện

3 card có icon: **Địa điểm** (tên + địa chỉ + link Maps) · **Trang phục** (dresscode + 4 swatch màu tròn lấy từ palette olive) · **Lưu ý** (gửi xe, giờ đến). Hover nâng 4px.

### 4. Chương trình

Tab switcher 2 ngày: "Lễ Vu Quy" / "Tiệc Cưới". Mỗi tab là timeline dọc: giờ + tiêu đề + mô tả + địa điểm (link Maps). Đường timeline mảnh với chấm tròn, animate vẽ dần khi scroll.

### 5. Album

Masonry grid 8–12 ảnh, lazy-load. Click → lightbox full-screen, vuốt trái/phải trên mobile, phím mũi tên trên desktop.

### 6. Bản đồ

Google Maps iframe + nút "Chỉ đường".

### 7. Sổ lưu bút

- Form gọn: **Tên** (bắt buộc, max 50 ký tự) + **Lời chúc** (bắt buộc, max 300 ký tự, có đếm ký tự).

- Submit → insert vào Supabase → hiện toast cảm ơn → prepend tin nhắn mới vào danh sách ngay (optimistic).

- Danh sách hiển thị dạng card nền `--sage-mist`, sắp xếp mới nhất trước, load 10 cái đầu + nút "Xem thêm".

- Chống spam cơ bản: honeypot field ẩn + chặn submit lại trong 60 giây (lưu timestamp ở localStorage).

- Có empty state khi chưa ai gửi.

**Supabase schema:**

```sql

create table guestbook (

  id uuid primary key default gen_random_uuid(),

  name text not null check (char_length(name) between 1 and 50),

  message text not null check (char_length(message) between 1 and 300),

  is_approved boolean default true,

  created_at timestamptz default now()

);

alter table guestbook enable row level security;

create policy "public insert" on guestbook for insert with check (true);

create policy "public read approved" on guestbook for select using (is_approved = true);

```

Cột `is_approved` để cặp đôi ẩn tin nhắn xấu thủ công từ Supabase dashboard.

### 8. CTA cuối / Liên hệ  ⭐ QUAN TRỌNG

Ảnh nền cặp đôi + overlay. Tiêu đề "Sự hiện diện của bạn là niềm hạnh phúc của chúng mình".

**2 nút Zalo riêng biệt**, mỗi nút có avatar tròn + tên:

- `Nhắn cô dâu — [Tên]` → `couple.bride.zalo`

- `Nhắn chú rể — [Tên]` → `couple.groom.zalo`

Dòng nhỏ: "Vui lòng phản hồi trước ngày [rsvpDeadline]".

### Footer

Monogram + ngày cưới + "Made with ♥".

## 7. Đặc tả nút Zalo (thay thế hoàn toàn form RSVP)

Component dùng chung `<ZaloButton person="bride" | "groom" variant="solid" | "outline" />`:

- Render `<a href={url} target="_blank" rel="noopener noreferrer">` — **KHÔNG dùng `window.open`**, sẽ bị popup blocker chặn trên iOS Safari.

- Link `zalo.me/<số điện thoại>` tự deep-link mở app Zalo trên mobile, mở web trên desktop. Không cần xử lý thêm.

- Icon Zalo dùng inline SVG (lucide không có).

- Style solid: nền `#0068FF`, chữ trắng, bo pill. Outline: viền trắng, nền trong suốt (dùng khi đặt trên ảnh).

- `aria-label` rõ ràng, ví dụ "Nhắn tin Zalo cho cô dâu Ngọc Anh".

- Ở navbar và hero chỉ có 1 nút chung → click mở **bottom sheet trên mobile / dialog trên desktop** cho khách chọn cô dâu hay chú rể.

Nút "Lưu vào lịch": sinh file `.ics` phía client + link Google Calendar template.

## 8. Nhạc nền

- Nút tròn nổi (floating) góc dưới phải, icon loa, kích thước 44×44px, có `aria-label`.

- **Không autoplay.** Trình duyệt sẽ chặn. Mặc định tắt; phát khi user bấm nút, hoặc phát ở lần tương tác đầu tiên (click/scroll) nếu user đã từng bật (lưu trạng thái ở localStorage).

- Fade in/out âm lượng 800ms khi bật/tắt, không cắt đột ngột.

- `loop`, volume mặc định 0.4.

- Tự pause khi tab ẩn (`visibilitychange`).

- Tôn trọng `prefers-reduced-motion` cho phần animation của nút.

## 9. Yêu cầu kỹ thuật

- **Mobile-first tuyệt đối** — đa số khách mở link từ trong app Zalo. Test kỹ ở 390px.

- Ảnh: `loading="lazy"`, `decoding="async"`, aspect-ratio cố định để tránh layout shift.

- Open Graph đầy đủ (og:title, og:description, og:image 1200×630) để link hiện thumbnail đẹp khi share trong Zalo. Meta title/description theo tiếng Việt.

- Hỗ trợ `prefers-reduced-motion`.

- Contrast chữ trên ảnh đạt tối thiểu AA.

- `<html lang="vi">` mặc định, đổi theo toggle ngôn ngữ.

## 10. KHÔNG làm

- Không tạo form RSVP, không thu thập email/số điện thoại khách.

- Không auth, không user account, không admin panel.

- Không thêm section blog/pricing/testimonial.

- Không dùng placeholder ảnh generic — dùng ảnh Unsplash chủ đề cưới tông sáng, xanh lá làm tạm.

## 11. Thứ tự triển khai

1. `src/config/wedding.ts` + `LanguageContext` + design tokens trong `tailwind.config`

2. Layout + Navbar + toggle ngôn ngữ

3. Hero + countdown + ZaloButton + dialog chọn người nhận

4. Các section 2→6

5. Supabase + sổ lưu bút

6. Nhạc nền + polish animation

Dừng lại sau bước 3 để tôi duyệt trước khi làm tiếp.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b5ffba1a-2865-40bd-93ea-699910f63b6d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
