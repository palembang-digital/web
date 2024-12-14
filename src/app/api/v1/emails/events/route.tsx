import { auth } from "@/auth";
import EventRegistrationSuccess from "@/emails/event-registration-success";
import EventReminder from "@/emails/event-reminder";
import { getEvent, getUser } from "@/services";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function isUserRegistered(event: any, user: any) {
  if (!user) {
    return false;
  }

  return event.eventsAttendees.some(
    (attendee: any) => attendee.user.id === user.id && attendee.rsvp === "yes"
  );
}

export async function POST(req: Request) {
  const session = await auth();
  // if (!session?.user) {
  //   return Response.json({ message: "Not authenticated" }, { status: 401 });
  // }

  // // @ts-ignore
  // if (session?.user?.role !== "administrator") {
  //   return Response.json({ message: "Not authorized" }, { status: 403 });
  // }

  const requestData = await req.json();
  if (
    !requestData.eventId ||
    !requestData.username ||
    !requestData.emailTemplate
  ) {
    return Response.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  const event = await getEvent(requestData.eventId);
  if (!event) {
    return Response.json({ message: "Event not found" }, { status: 404 });
  }

  const user = await getUser(requestData.username);
  if (!user) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }

  const isRegistered = isUserRegistered(event, user);
  if (!isRegistered) {
    return Response.json(
      { message: "User is not registered to the event" },
      { status: 400 }
    );
  }

  let subject = "";
  let template = null;
  if (requestData.emailTemplate === "event-registration") {
    subject = `Konfirmasi pendaftaran ${event.name}`;
    template = EventRegistrationSuccess;
  } else if (requestData.emailTemplate === "event-reminder") {
    subject = `Reminder kegiatan ${event.name}`;
    template = EventReminder;
  }

  if (!template) {
    return Response.json({ message: "Template not found" }, { status: 404 });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Palembang Digital <events@palembangdigital.org>",
      to: [user.email],
      subject: subject,
      react: template({ event, user }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
