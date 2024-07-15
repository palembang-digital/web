import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const data = await request.json();
  console.log(data);

  return NextResponse.json({ message: "Hello, world!" });
}
