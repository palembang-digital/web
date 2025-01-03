import { clsx, type ClassValue } from "clsx";
import { DateTime } from "luxon";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDay(date: Date): string {
  return DateTime.fromJSDate(date)
    .setZone("Asia/Jakarta")
    .setLocale("id")
    .toLocaleString({ weekday: "long" });
}

export function getDate(date: Date): string {
  return DateTime.fromJSDate(date, { zone: "utc" })
    .setZone("Asia/Jakarta")
    .setLocale("id")
    .toFormat("dd");
}

export function getMonth(date: Date): string {
  return DateTime.fromJSDate(date)
    .setZone("Asia/Jakarta")
    .setLocale("id")
    .toFormat("LLL");
}

export function getYear(date: Date): string {
  return DateTime.fromJSDate(date)
    .setZone("Asia/Jakarta")
    .setLocale("id")
    .toFormat("yyyy");
}

export function getMonthYear(date: Date): string {
  return `${getMonth(date)} ${getYear(date)}`;
}

export function localeDate(
  date: Date,
  zone: string = "Asia/Jakarta",
  locale: string = "id"
): string {
  return DateTime.fromJSDate(date)
    .setZone(zone)
    .setLocale(locale)
    .toLocaleString(DateTime.DATE_FULL);
}

export function localeTime(
  date: Date,
  zone: string = "Asia/Jakarta",
  locale: string = "id"
): string {
  return DateTime.fromJSDate(date)
    .setZone(zone)
    .setLocale(locale)
    .toLocaleString({
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
}

export function localeTimeFromString(
  date: string,
  zone: string = "Asia/Jakarta",
  locale: string = "id"
): string {
  return DateTime.fromISO(date).setZone(zone).setLocale(locale).toLocaleString({
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

export function toGCalDate(date: Date, zone: string = "Asia/Jakarta"): string {
  return DateTime.fromJSDate(date).setZone(zone).toFormat("yyyyMMdd'T'HHmmss");
}

export function getYoutubeVideoId(url: string): string {
  if (!url) return "";

  const urlParams = new URLSearchParams(new URL(url).search);
  return urlParams.get("v") || "";
}

export function timeAgo(
  date: string,
  zone: string = "Asia/Jakarta",
  locale: string = "id"
): string {
  return (
    DateTime.fromISO(date).setZone(zone).setLocale(locale).toRelative() || ""
  );
}

export function formatContent(content: string) {
  let output = content.replaceAll("\n", "<br/>");

  // replace mentions
  output = output.replaceAll(
    /@([a-zA-Z0-9_-]+)/g,
    '<a class="font-medium hover:underline" href="/$1">@$1</a>'
  );

  // replace markdown bold
  output = output.replaceAll(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  return output;
}
