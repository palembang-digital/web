import { db } from "@/db";
import { feedsComments } from "@/db/schema";
import { task } from "@trigger.dev/sdk/v3";
import OpenAI from "openai";

export const answerQuestionTask = task({
  id: "patal-bot-answer-question",
  maxDuration: 300, // 5 minutes
  run: async (payload: any, { ctx }) => {
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const feedId = payload.feedId;
    const query = payload.query;

    const patalBotUserId = "71b5d744-9cd0-4078-9c6c-0e03631778fa";

    const completion = await openai.chat.completions.create({
      model: "nousresearch/hermes-3-llama-3.1-405b:free",
      messages: [
        {
          role: "user",
          content: query,
        },
      ],
    });

    const answer = completion.choices[0].message.content;

    if (!answer) {
      return {
        message: "Failed to get an answer from the model",
      };
    }

    const inputComment = {
      comment: answer,
      userId: patalBotUserId,
      feedId: feedId,
    };

    await db.transaction(async (tx) => {
      const result = await tx
        .insert(feedsComments)
        .values(inputComment)
        .returning();
      if (result.length === 0) {
        return Response.json(
          { message: "Failed to create a new comment" },
          { status: 500 }
        );
      }
    });

    return {
      query: query,
      answer: answer,
    };
  },
});
