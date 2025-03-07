import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./modules/auth/authRouter";
import chatRouter from "./modules/chat/chatRouter";
import cors from "cors";
import { PORT } from "./environment";
import connectToDB from "./db";
import { Request, Response } from "express";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/chat", chatRouter);

app.get("/test", (_, res: Response) => {
  res.status(200).json({ message: "App is running" });
});

app.listen(PORT, async () => {
  try {
    await connectToDB();
    console.log(`The app is listening on ${PORT}`);
  } catch (error) {
    console.error(error);
  }
});
