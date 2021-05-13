import { Express, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import df from "../default/default";
import User from "../schema/user.schema";

async function register(req: Request, res: Response, next: NextFunction) {

  const email = req.body.email;
  const password = req.body.password;
  
  if ( /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) === false || password.length <= 6)
    return res.send('Enter valid email and password'); 


  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    role: req.body.role
  });

  try {
    
    

    const token = jwt.sign({ id: user._id }, df.privateKey, {
      expiresIn: "24h", // expires in 24 hours
    });
    const userData = await user.save();
    console.info(userData);
    
    res.status(200).send({ auth: true, token: token });
  } catch (err) {
    res.status(500).send("User already exist.");
  }
}

async function verifyUser(req: Request, res: Response, next: NextFunction) {
  User.findById(req.body.userId, function (err: Error, user: any) {
    if (err)
      return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");

    res.status(200).send(user);
  });
}

async function login(req: Request, res: Response, next: NextFunction) {
  User.findOne(
    { email: req.body.email },
    function (err: any, user: any) {
      if (err) return res.status(500).send("Error on the server.");
      if (!user) return res.status(404).send("No user found.");

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid)
        return res.status(401).send({ auth: false, token: null });

      var token = jwt.sign({ id: user._id }, df.privateKey, {
        expiresIn: "24h", // expires in 24 hours
      });

      res.status(200).send({ auth: true, token: token });
    }
  );
}

async function logout(req: Request, res: Response) {
  res.status(200).send({ auth: false, token: null });
}

export default {
  register,
  verifyUser,
  login,
  logout,
};
