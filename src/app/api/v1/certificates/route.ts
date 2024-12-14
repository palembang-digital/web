import { db } from "@/db";
import { certificates } from "@/db/schema";
import { getEvent, getUser } from "@/services";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  if (!data.eventId) {
    return NextResponse.json(
      { message: "Event ID is required" },
      { status: 400 }
    );
  }

  if (!data.username) {
    return NextResponse.json(
      { message: "Username is required" },
      { status: 400 }
    );
  }

  if (!data.role) {
    return NextResponse.json({ message: "Role is required" }, { status: 400 });
  }

  if (!data.template) {
    return NextResponse.json(
      { message: "Template is required" },
      { status: 400 }
    );
  }

  const event = await getEvent(data.eventId);
  if (!event) {
    return NextResponse.json({ message: "Event not found" }, { status: 404 });
  }

  const user = await getUser(data.username);
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const inputCertificate = {
    eventId: event.id,
    userId: user.id,
    role: data.role,
    template: data.template,
  };
  console.log(inputCertificate);

  const result = await db.transaction(async (tx) => {
    return await tx.insert(certificates).values(inputCertificate).returning();
  });

  return NextResponse.json({ message: "Certificate created", data: result });
}
