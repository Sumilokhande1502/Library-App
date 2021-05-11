import { Request, Response } from "express";
import config from 'config';
import { validatePassword } from "../service/user.service";
import { createAccessToken, createSession } from "../service/session.service";
import {sign} from '../utils/jwt.util';

export async function createUserSessionHandler(req: Request, res: Response) {
  //validate the email and password is registered
  const user:any = await validatePassword(req.body);

  if (!user) {
    res.status(401).send("Invalid username or password");
  }

  //create access token
  const session = await createSession(user._id, req.get("user-agent") || "");

  const accessToken = createAccessToken({
    user,
    session
  });

  //create refresh token
  const refreshToken = sign(session, {
      expiresIn: config.get("refreshTokenTtl"), //1 year
  });

  //send both tokens
  return res.send({accessToken, refreshToken});
}
