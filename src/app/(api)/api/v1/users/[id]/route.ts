import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }

  if (session?.user?.id !== params.id) {
    return Response.json({ message: "Not authorized" }, { status: 403 });
  }

  const data = await req.json();

  await db.update(users).set(data).where(eq(users.id, params.id));

  const updatedUser = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, params.id),
  });

  return Response.json({ message: "User updated", data: updatedUser });
}
