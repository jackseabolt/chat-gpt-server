import mongoose, { Schema, Document, Model } from "mongoose";

interface ISession extends Document {
  userId: { type: Schema.Types.ObjectId; ref: "User" };
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const SessionSchema = new Schema<ISession>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isActive: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const SessionModel: Model<ISession> = mongoose.model<ISession>(
  "Sessions",
  SessionSchema
);

export default SessionModel;
