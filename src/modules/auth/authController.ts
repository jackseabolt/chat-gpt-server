import { Request, Response } from "express";
import UserModel from "../../models/user";
import SessionModel from "../../models/session";
import { hashPassword, comparePasswords } from "../../utils/encryption";

export async function signUp(
  req: Request<
    null,
    null,
    { username: string; password: string; firstName: string; lastName: string }
  >,
  res: Response
) {
  const { username, password, firstName, lastName } = req.body;

  const result = await UserModel.findOne({ username });

  if (result) {
    return res.status(422).json({ message: "User could not be created " });
  }

  const hashedPassword = await hashPassword(password);

  const user = await UserModel.create({
    username,
    password: hashedPassword,
    firstName,
    lastName,
  });

  res.status(201).json({ message: "Successfully created user" });
}

export async function logIn(
  req: Request<null, null, { username: string; password: string }>,
  res: Response
) {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isMatch = await comparePasswords(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const session = await SessionModel.create({
    isActive: true,
    userId: user._id,
  });

  res.cookie("session-token", session._id, {
    httpOnly: false,
    secure: false,
    sameSite: "none", // TODO fix
    maxAge: 24 * 60 * 60 * 100, // 24 hours
  });

  res.status(200).json({ message: "User authenticated" });
}
