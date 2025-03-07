import { Request, Response } from "express";
import OpenAI from "openai";
import { OPEN_API_KEY } from "../../environment";
import * as types from "./types";

const openai = new OpenAI({ apiKey: OPEN_API_KEY });

export async function chat(req: Request<{}, types.ChatParams>, res: Response) {
  console.log("SUP");
  const { content } = req.body;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const stream = await openai.chat.completions.create({
    model: "gpt-4o-mini-2024-07-18",
    messages: [{ role: "user", content }],
    stream: true,
  });

  for await (const chunk of stream) {
    res.write(JSON.stringify(chunk.choices[0]?.delta?.content || ""));
  }

  res.end();
}
