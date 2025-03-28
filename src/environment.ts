import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const DB_URI = process.env.DB_URI;
export const OPEN_API_KEY = process.env.OPENAI_API_KEY;
export const NODE_ENV = process.env.NODE_ENV;
