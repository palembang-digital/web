import { task } from "@trigger.dev/sdk/v3";

export const sendEmail = task({
  id: "send-email",
  maxDuration: 300, // 5 minutes
  run: async (payload: any, { ctx }) => {
    const { to, subject, body, emailTemplate } = payload;
    console.log(payload);
    return {
      message: "Email sent",
    };
  },
});
