import bcrypt from "bcrypt";

export async function comparePasswords(
  plainTextPassword: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  } catch (error) {
    console.error("Error comparing passwords:", error);
    return false;
  }
}

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10; // Number of salt rounds (higher = more secure but slower)
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Failed to hash password");
  }
}
