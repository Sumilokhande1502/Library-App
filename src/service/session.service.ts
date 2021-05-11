import { LeanDocument } from "mongoose";
import config from "config";
import { UserDocument } from "../models/book";
import Session, { SessionDocument } from "../models/session.model";
import { sign } from "../utils/jwt.util";

export async function createSession(userId: string, userAgent: string) {
  const session = await Session.create({ user: userId, userAgent: userAgent });

  return session.toJSON();
}

export function createAccessToken({
  user,
  session,
}: {
  user:
    | Omit<UserDocument, "password">
    | LeanDocument<Omit<UserDocument, "password">>;
  session:
    | Omit<SessionDocument, "password">
    | LeanDocument<Omit<SessionDocument, "password">>;
}) {
  //Build and return new access tokens
  const accessToken = sign(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") } //15 minutes
  );
  return accessToken;
}
