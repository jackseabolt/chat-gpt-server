import mongoose from "mongoose";
import { DB_URI } from "./environment";

export default async function connectToDB() {
  try {
    await mongoose.connect(DB_URI as string);
    console.log("The database connected");
  } catch (e) {
    console.error("The DB did not connect");
  }
}
