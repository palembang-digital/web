import { getDate, getMonth, getMonthYear, getYear } from "@/lib/utils";
import { expect, test } from "vitest";

test("getDate should return 01", () => {
  expect(getDate(new Date("2024-01-01"))).toBe("01");
});

test("getMonth should return Jan", () => {
  expect(getMonth(new Date("2024-01-01"))).toBe("Jan");
});

test("getYear should return 2024", () => {
  expect(getYear(new Date("2024-01-01"))).toBe("2024");
});

test("getMonthYear should return Jan 2024", () => {
  expect(getMonthYear(new Date("2024-01-01"))).toBe("Jan 2024");
});
