"use server";

import { ChatMessage } from "@/types";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateChatResponse = async (chatMessages: ChatMessage[]) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }, ...chatMessages],
      model: "gpt-3.5-turbo",
      temperature: 0,
    });

    return response.choices[0].message; // {role:'assistant', content:'hello! how can i help you?'}
  } catch (error) {
    return null;
  }
};
