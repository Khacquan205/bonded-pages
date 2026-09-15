export type Bilingual = { vi: string; en: string };

export const wedding = {
  couple: {
    bride: {
      name: "Nguyễn Huyền Nga",
      shortName: "Huyền Nga",
      role: { vi: "Ái nữ", en: "Daughter" },
      mother: { vi: "Bà Trần Thị Tuyết Mai", en: "Mrs. Tran Thi Tuyet Mai" },
      zalo: "https://zalo.me/0985868349",
      avatar:
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80",
    },
    groom: {
      name: "Trần Thành Long",
      shortName: "Thành Long",
      role: { vi: "Trưởng nam", en: "Eldest son" },
      mother: { vi: "Bà Nguyễn Thị Thuỷ", en: "Mrs. Nguyen Thi Thuy" },
      zalo: "https://zalo.me/0366200504",
      avatar:
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=400&q=80",
    },
  },
  date: {
    ceremony: "2026-12-11T09:00:00+07:00",
    reception: "2026-12-11T18:00:00+07:00",
    lunar: {
      vi: "Tức ngày 03 tháng 11 năm Bính Ngọ",
      en: "Lunar calendar: Day 03, Month 11, Year of the Horse",
    },
  },
  rsvpDeadline: "2026-11-25",
  venue: {
    name: "JW Marriott Hotel",
    address: {
      vi: "Đường Hai Bà Trưng, Quận 1, TP. Hồ Chí Minh",
      en: "Hai Ba Trung Street, District 1, Ho Chi Minh City",
    },
    mapsUrl: "https://maps.google.com/?q=JW+Marriott+Hotels+and+Suites+Saigon",
    embedUrl:
      "https://www.google.com/maps?q=JW+Marriott+Hotels+and+Suites+Saigon&output=embed",
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
        vi: "Để buổi tiệc thêm phần trọn vẹn, quý khách vui lòng mặc theo dress code (màu sắc yêu cầu) nhé!",
        en: "To make our celebration even more memorable, guests are kindly requested to dress in the requested colors.",
      },
      swatches: [
        { name: "Fig red", hex: "#610401", image: "/images/swatch-fig-red.png" },
        { name: "Dusty Lilac", hex: "#7f88bb", image: "/images/swatch-dusty-lilac.png" },
        { name: "Blush Rose", hex: "#a66680", image: "/images/swatch-blush-rose.png" },
        { name: "Olive Milk", hex: "#a9bd73", image: "/images/swatch-olive-milk.png" },
      ],
    },
    notes: {
      title: { vi: "Lưu ý", en: "Good to know" },
      text: {
        vi: "Bãi giữ xe tại tầng hầm khách sạn. Vui lòng đến trước giờ khai tiệc 30 phút để chúng mình kịp chào đón bạn.",
        en: "Hotel basement parking available. Please arrive 30 minutes before reception so we have time to greet you.",
      },
    },
  },
  timeline: [
    {
      key: "ceremony",
      tab: { vi: "Lễ Vu Quy", en: "Ceremony" },
      date: "2026-12-11T09:00:00+07:00",
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
      date: "2026-12-11T18:00:00+07:00",
      items: [
        {
          time: "18:00",
          title: { vi: "Đón khách", en: "Guest welcome" },
          desc: { vi: "Chụp ảnh lưu niệm tại photo booth.", en: "Photos at the photo booth." },
          location: { vi: "JW Marriott Hotel", en: "JW Marriott Hotel" },
        },
        {
          time: "18:30",
          title: { vi: "Nghi thức cưới & Khai tiệc", en: "Ceremony & Dinner" },
          desc: { vi: "Cô dâu chú rể tiến vào lễ đường và khai tiệc tối.", en: "The couple walks down the aisle and dinner begins." },
          location: { vi: "JW Marriott Hotel", en: "JW Marriott Hotel" },
        },
        {
          time: "21:00",
          title: { vi: "Tiễn khách", en: "Farewell" },
          desc: { vi: "Cảm ơn bạn đã ở đây cùng chúng mình.", en: "Thank you for being here with us." },
          location: { vi: "JW Marriott Hotel", en: "JW Marriott Hotel" },
        },
      ],
    },
  ],
  gallery: [
    "https://images.unsplash.com/photo-1620315472787-52921e5f88a0?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1603298576121-586c2d880e59?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80",
  ],
  closing: {
    image:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1920&q=80",
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
