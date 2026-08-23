export type Bilingual = { vi: string; en: string };

export const wedding = {
  couple: {
    bride: {
      name: "Nguyễn Ngọc Anh",
      shortName: "Ngọc Anh",
      zalo: "https://zalo.me/0901234567",
      avatar:
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80",
    },
    groom: {
      name: "Trần Minh Quân",
      shortName: "Minh Quân",
      zalo: "https://zalo.me/0907654321",
      avatar:
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=400&q=80",
    },
  },
  date: {
    ceremony: "2026-11-14T09:00:00+07:00",
    reception: "2026-11-15T17:00:00+07:00",
  },
  rsvpDeadline: "2026-10-01",
  venue: {
    name: "White Palace Convention Center",
    address: {
      vi: "194 Hoàng Văn Thụ, Phường 9, Quận Phú Nhuận, TP. Hồ Chí Minh",
      en: "194 Hoang Van Thu St., Ward 9, Phu Nhuan District, Ho Chi Minh City",
    },
    mapsUrl: "https://maps.google.com/?q=White+Palace+Hoang+Van+Thu",
    embedUrl:
      "https://www.google.com/maps?q=White+Palace+194+Hoang+Van+Thu&output=embed",
  },
  hero: {
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1920&q=80",
    label: { vi: "Save the date", en: "Save the date" },
  },
  story: {
    intro: {
      vi: "Chúng mình gặp nhau vào một chiều Sài Gòn nhiều nắng, giữa quán cà phê nhỏ có giàn cây xanh trước cửa. Sáu năm, vài lần chuyển nhà, rất nhiều chuyến đi — và một lời hẹn ước.",
      en: "We met on a sunny Saigon afternoon in a small café with a green trellis by the door. Six years, a few moves, many journeys — and one promise.",
    },
    bride: {
      title: { vi: "Về Ngọc Anh", en: "About Ngoc Anh" },
      text: {
        vi: "Cô gái thích cây cối, nấu ăn vào cuối tuần và luôn nhớ sinh nhật của tất cả mọi người. Là người đã dạy anh cách chậm lại.",
        en: "A girl who loves plants, cooks on weekends, and remembers everyone's birthday. She is the one who taught him how to slow down.",
      },
      image:
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80",
    },
    groom: {
      title: { vi: "Về Minh Quân", en: "About Minh Quan" },
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
      title: { vi: "Trang phục", en: "Dress code" },
      text: {
        vi: "Trang phục lịch sự, tông kem – xanh olive. Rất mong bạn cùng chúng mình giữ khung hình thật hài hoà.",
        en: "Semi-formal in cream and olive tones. We'd love you to match our palette.",
      },
      swatches: ["#FAF7F0", "#DCE3D6", "#A8B5A0", "#6B7355"],
    },
    notes: {
      title: { vi: "Lưu ý", en: "Good to know" },
      text: {
        vi: "Bãi giữ xe miễn phí tại tầng hầm B1. Vui lòng đến trước giờ khai tiệc 30 phút để chúng mình kịp chào bạn.",
        en: "Free parking at basement B1. Please arrive 30 minutes early so we have time to greet you.",
      },
    },
  },
  timeline: [
    {
      key: "ceremony",
      tab: { vi: "Lễ Vu Quy", en: "Ceremony" },
      date: "2026-11-14T09:00:00+07:00",
      items: [
        {
          time: "08:00",
          title: { vi: "Đón khách", en: "Guest welcome" },
          desc: { vi: "Trà bánh tại sân vườn nhà gái.", en: "Tea and pastries in the garden." },
          location: { vi: "Tư gia nhà gái", en: "Bride's family home" },
        },
        {
          time: "09:00",
          title: { vi: "Lễ gia tiên", en: "Ancestral rites" },
          desc: { vi: "Nghi thức truyền thống trước bàn thờ gia tiên.", en: "Traditional rites before the family altar." },
          location: { vi: "Tư gia nhà gái", en: "Bride's family home" },
        },
        {
          time: "11:00",
          title: { vi: "Tiệc thân mật", en: "Family lunch" },
          desc: { vi: "Bữa cơm ấm cúng cùng hai bên gia đình.", en: "A warm meal with both families." },
          location: { vi: "Tư gia nhà gái", en: "Bride's family home" },
        },
      ],
    },
    {
      key: "reception",
      tab: { vi: "Tiệc Cưới", en: "Reception" },
      date: "2026-11-15T17:00:00+07:00",
      items: [
        {
          time: "17:00",
          title: { vi: "Đón khách", en: "Guest welcome" },
          desc: { vi: "Chụp ảnh lưu niệm tại photo booth.", en: "Photos at the photo booth." },
          location: { vi: "White Palace, Sảnh Rose", en: "White Palace, Rose Hall" },
        },
        {
          time: "18:00",
          title: { vi: "Nghi thức cưới", en: "Wedding ceremony" },
          desc: { vi: "Cô dâu chú rể tiến vào lễ đường.", en: "The couple walks down the aisle." },
          location: { vi: "White Palace, Sảnh Rose", en: "White Palace, Rose Hall" },
        },
        {
          time: "18:45",
          title: { vi: "Khai tiệc", en: "Dinner" },
          desc: { vi: "Tiệc tối và chương trình âm nhạc.", en: "Dinner service and live music." },
          location: { vi: "White Palace, Sảnh Rose", en: "White Palace, Rose Hall" },
        },
        {
          time: "21:00",
          title: { vi: "Tiễn khách", en: "Farewell" },
          desc: { vi: "Cảm ơn bạn đã ở đây cùng chúng mình.", en: "Thank you for being here with us." },
          location: { vi: "White Palace, Sảnh Rose", en: "White Palace, Rose Hall" },
        },
      ],
    },
  ],
  gallery: [
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1000&q=80",
  ],
  closing: {
    image:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1920&q=80",
    title: {
      vi: "Sự hiện diện của bạn là niềm hạnh phúc của chúng mình",
      en: "Your presence is our greatest happiness",
    },
  },
  music: { src: "/audio/bg.mp3", title: "Cùng anh — Ngọt" },
  theme: {
    cream: "#FAF7F0",
    creamDeep: "#F1EBE0",
    olive: "#6B7355",
    oliveDeep: "#4A5240",
    eucalyptus: "#A8B5A0",
    sageMist: "#DCE3D6",
    text: "#2E332B",
    textMuted: "#6E7268",
    zalo: "#0068FF",
  },
} as const;

export type Wedding = typeof wedding;
export const monogram =
  wedding.couple.bride.shortName.trim().slice(-1).toUpperCase() +
  " & " +
  wedding.couple.groom.shortName.trim().slice(-1).toUpperCase();
