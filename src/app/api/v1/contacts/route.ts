import { db } from "@/db";
import { contactForm } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  await db.insert(contactForm).values(data);

  return NextResponse.json({
    message: "Message received",
    data: data,
  });
}
