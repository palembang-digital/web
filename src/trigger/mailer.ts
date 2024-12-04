import EventRegistrationSuccess from "@/emails/event-registration-success";
import { task } from "@trigger.dev/sdk/v3";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = task({
  id: "send-email",
  maxDuration: 300, // 5 minutes
  run: async (payload: any, { ctx }) => {
    const { to, subject, body, emailTemplate } = payload;

    let template = null;
    if (emailTemplate === "event-registration") {
      template = EventRegistrationSuccess;
    }

    if (!template) {
      return Response.json({ message: "Template not found" }, { status: 404 });
    }

    const { data, error } = await resend.emails.send({
      from: "Palembang Digital <events@palembangdigital.org>",
      to: [to],
      subject: subject,
      react: template({ event: body.event, user: body.user }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  },
});
