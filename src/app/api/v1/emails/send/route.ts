import { auth } from "@/auth";
import { WelcomeEmail } from "@/components/emails/welcome_email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }

  // @ts-ignore
  if (session?.user?.role !== "administrator") {
    return Response.json({ message: "Not authorized" }, { status: 403 });
  }

  const requestData = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: "Palembang Digital <no-reply@palembangdigital.org>",
      to: [requestData.to],
      subject: "Hello world",
      react: WelcomeEmail({ firstName: "Aurora" }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
