import { wedding } from "@/config/wedding";

const pad = (n: number) => String(n).padStart(2, "0");

function toUtc(iso: string) {
  const d = new Date(iso);
  return (
    d.getUTCFullYear() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    "T" +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    "Z"
  );
}

function endOf(iso: string, hours = 4) {
  return new Date(new Date(iso).getTime() + hours * 3600000).toISOString();
}

export function eventTitle(lang: "vi" | "en") {
  const { bride, groom } = wedding.couple;
  return lang === "vi"
    ? `Tiệc cưới ${bride.shortName} & ${groom.shortName}`
    : `Wedding of ${bride.shortName} & ${groom.shortName}`;
}

export function googleCalendarUrl(lang: "vi" | "en") {
  const start = wedding.date.reception;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: eventTitle(lang),
    dates: `${toUtc(start)}/${toUtc(endOf(start))}`,
    details: wedding.venue.mapsUrl,
    location: `${wedding.venue.name}, ${wedding.venue.address[lang]}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadIcs(lang: "vi" | "en") {
  const start = wedding.date.reception;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//wedding//invite//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@wedding`,
    `DTSTAMP:${toUtc(new Date().toISOString())}`,
    `DTSTART:${toUtc(start)}`,
    `DTEND:${toUtc(endOf(start))}`,
    `SUMMARY:${eventTitle(lang)}`,
    `LOCATION:${wedding.venue.name}, ${wedding.venue.address[lang]}`,
    `DESCRIPTION:${wedding.venue.mapsUrl}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "wedding.ics";
  a.click();
  URL.revokeObjectURL(url);
}
