export type Bilingual = { vi: string; en: string };

export const wedding = {
  couple: {
    bride: {
      name: "Nguyễn Huyền Nga",
      shortName: "Huyền Nga",
      role: { vi: "Ái nữ", en: "Daughter" },
      mother: { vi: "Bà Nguyễn Thị Thuỷ", en: "Mrs. Nguyen Thi Thuy" },
      zalo: "https://zalo.me/0985868349",
      avatar:
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80",
    },
    groom: {
      name: "Trần Thành Long",
      shortName: "Thành Long",
      role: { vi: "Trưởng nam", en: "Eldest son" },
      mother: { vi: "Bà Tạ Thị Tuyết Mai", en: "Mrs. Ta Thi Tuyet Mai" },
      zalo: "https://zalo.me/0366200504",
      avatar:
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=400&q=80",
    },
    mothers: {
      groomMother: {
        name: { vi: "Bà Tạ Thị Tuyết Mai", en: "Mrs. Ta Thi Tuyet Mai" },
        shortName: "Mẹ Mai",
        side: { vi: "Nhà trai", en: "Groom's family" },
        zalo: "https://zalo.me/0366200504",
      },
      brideMother: {
        name: { vi: "Bà Nguyễn Thị Thuỷ", en: "Mrs. Nguyen Thi Thuy" },
        shortName: "Mẹ Thuỷ",
        side: { vi: "Nhà gái", en: "Bride's family" },
        zalo: "https://zalo.me/0985868349",
      },
    },
  },
  date: {
    ceremony: "2026-12-06T09:00:00+07:00",
    reception: "2026-12-11T18:00:00+07:00",
    ceremonyLunar: {
      vi: "Nhằm ngày 28 tháng 10 năm Bính Ngọ",
      en: "Lunar calendar: Day 28, Month 10, Year of the Horse",
    },
    receptionLunar: {
      vi: "Tức ngày 03 tháng 11 năm Bính Ngọ",
      en: "Lunar calendar: Day 03, Month 11, Year of the Horse",
    },
    lunar: {
      vi: "Tức ngày 03 tháng 11 năm Bính Ngọ",
      en: "Lunar calendar: Day 03, Month 11, Year of the Horse",
    },
  },
  rsvpDeadline: "2026-11-25",
  venue: {
    name: "JW Marriott Hotel & Suites Saigon",
    address: {
      vi: "Góc đường Hai Bà Trưng & Đại Lộ Lê Duẩn, Phường Sài Gòn, TP. Hồ Chí Minh",
      en: "Corner of Hai Ba Trung & Le Duan Blvd, Ben Nghe Ward, Dist 1, HCMC",
    },
    mapsUrl: "https://maps.google.com/?q=JW+Marriott+Hotel+and+Suites+Saigon",
    embedUrl:
      "https://www.google.com/maps?q=JW+Marriott+Hotel+and+Suites+Saigon&output=embed",
  },
  hero: {
    image: "/images/hero-couple.png",
    label: { vi: "Save the date", en: "Save the date" },
    dateDisplay: "11.12.26",
  },
  story: {
    intro: {
      vi: "Chúng mình gặp nhau vào một chiều Sài Gòn nhiều nắng, giữa quán cà phê nhỏ có giàn cây xanh trước cửa. Sáu năm, vài lần chuyển nhà, rất nhiều chuyến đi — và một lời hẹn ước.",
      en: "We met on a sunny Saigon afternoon in a small café with a green trellis by the door. Six years, a few moves, many journeys — and one promise.",
    },
    bride: {
      title: { vi: "Về Huyền Nga", en: "About Huyen Nga" },
      text: {
        vi: "Cô gái thích cây cối, nấu ăn vào cuối tuần và luôn nhớ sinh nhật của tất cả mọi người. Là người đã dạy anh cách chậm lại.",
        en: "A girl who loves plants, cooks on weekends, and remembers everyone's birthday. She is the one who taught him how to slow down.",
      },
      image:
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80",
    },
    groom: {
      title: { vi: "Về Thành Long", en: "About Thanh Long" },
      text: {
        vi: "Chàng trai mê nhiếp ảnh phim, cà phê pha tay và những cung đường ven biển. Là người luôn giữ tay em ấm mỗi khi trời trở lạnh.",
        en: "A guy into film photography, hand-brewed coffee and coastal roads. The one who always keeps her hands warm when the weather turns.",
      },
      image:
        "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=80",
    },
  },
  info: {
    dresscode: {
      title: { vi: "Dress code", en: "Dress code" },
      text: {
        vi: "Để buổi tiệc thêm phần trọn vẹn và trang nhã, quý khách vui lòng chọn trang phục theo bảng màu dress code gợi ý bên dưới.",
        en: "To make our celebration even more memorable, guests are kindly requested to dress in the requested colors.",
      },
      swatches: [
        { name: "Cream", hex: "#f5f0e8", image: "/images/swatch-cream.png" },
        { name: "Dusty Lilac", hex: "#7f88bb", image: "/images/swatch-dusty-lilac.png" },
        { name: "Blush Rose", hex: "#a66680", image: "/images/swatch-blush-rose.png" },
        { name: "Deep Bordeaux", hex: "#4a040b", image: "/images/swatch-fig-red.png" },
      ],
    },
    notes: {
      title: { vi: "Lưu ý & Đậu xe", en: "Arrival & Parking" },
      text: {
        vi: "Bãi giữ xe rộng rãi tại tầng hầm khách sạn JW Marriott Hotel & Suites Saigon. Vui lòng đến trước giờ khai tiệc 30 phút để chúng mình kịp chào đón bạn.",
        en: "Hotel basement parking available at JW Marriott Hotel & Suites Saigon. Please arrive 30 minutes before reception so we have time to greet you.",
      },
    },
  },
  timeline: [
    {
      key: "reception",
      tab: { vi: "Tiệc Cưới", en: "Reception" },
      date: "2026-12-11T18:00:00+07:00",
      items: [
        {
          time: "18:00",
          title: { vi: "Đón khách & Chụp ảnh lưu niệm", en: "Guest Welcome & Photos" },
          desc: { vi: "Chụp ảnh lưu niệm tại photo booth cùng cô dâu & chú rể.", en: "Welcome drinks and photos with the couple." },
          location: { vi: "JW Marriott Hotel & Suites Saigon", en: "JW Marriott Hotel & Suites Saigon" },
        },
        {
          time: "18:30",
          title: { vi: "Nghi thức cưới & Khai tiệc", en: "Ceremony & Dinner" },
          desc: { vi: "Cô dâu chú rể tiến vào lễ đường và khai tiệc tối ấm cúng.", en: "The couple walks down the aisle and dinner begins." },
          location: { vi: "Sảnh tiệc chính (Grand Ballroom)", en: "Grand Ballroom" },
        },
        {
          time: "20:30",
          title: { vi: "Giao lưu & Âm nhạc", en: "Party & Music" },
          desc: { vi: "Cùng nâng ly chúc phúc và lưu giữ khoảnh khắc đáng nhớ.", en: "Toasts, music and memorable moments." },
          location: { vi: "JW Marriott Hotel & Suites Saigon", en: "JW Marriott Hotel & Suites Saigon" },
        },
        {
          time: "21:00",
          title: { vi: "Tiễn khách", en: "Farewell" },
          desc: { vi: "Cảm ơn bạn đã ở đây chung vui cùng gia đình chúng mình.", en: "Thank you for being here with us." },
          location: { vi: "JW Marriott Hotel & Suites Saigon", en: "JW Marriott Hotel & Suites Saigon" },
        },
      ],
    },
    {
      key: "ceremony",
      tab: { vi: "Lễ Thành Hôn", en: "Wedding Ceremony" },
      date: "2026-12-06T09:00:00+07:00",
      items: [
        {
          time: "08:30",
          title: { vi: "Đón tiếp họ hàng", en: "Welcoming Family" },
          desc: { vi: "Hai bên gia đình đón tiếp quan khách và chuẩn bị nghi thức.", en: "Families gather and prepare for the ceremony." },
          location: { vi: "Tư gia", en: "Private Residence" },
        },
        {
          time: "09:00",
          title: { vi: "Cử hành Hôn Lễ gia tiên", en: "Traditional Ancestor Ceremony" },
          desc: { vi: "Nghi thức thắp hương gia tiên báo cáo tổ tiên tại tư gia (28/10 Âm lịch).", en: "Traditional ancestor rites at private residence." },
          location: { vi: "Tư gia", en: "Private Residence" },
        },
        {
          time: "10:30",
          title: { vi: "Tiệc thân mật cùng gia đình", en: "Family Lunch" },
          desc: { vi: "Dùng bữa cơm thân mật chung vui cùng hai họ.", en: "Intimate lunch with close family." },
          location: { vi: "Tư gia", en: "Private Residence" },
        },
      ],
    },
  ],
  gallery: [
    "/images/gallery/gallery-01.jpg",
    "/images/gallery/gallery-03.jpg",
    "/images/gallery/gallery-07.jpg",
  ],
  closing: {
    image: "/images/gallery/closing-bg.jpg",
    title: {
      vi: "Sự hiện diện của bạn là niềm hạnh phúc của chúng mình",
      en: "Your presence is our greatest happiness",
    },
  },
  theme: {
    maroon: "#4A1521",
    maroonDeep: "#360E17",
    walnut: "#3D271D",
    cream: "#FAF6F0",
    creamDeep: "#F3ECE0",
    olive: "#5A6347",
    oliveDeep: "#444C34",
    eucalyptus: "#8B9577",
    sageMist: "#D7DED0",
    text: "#3D271D",
    textMuted: "#6E5A4E",
    zalo: "#0068FF",
  },
} as const;

export type Wedding = typeof wedding;
const initial = (n: string) => (n.trim().split(/\s+/).pop() ?? n).charAt(0).toUpperCase();
export const monogram = `${initial(wedding.couple.bride.shortName)} & ${initial(wedding.couple.groom.shortName)}`;
