import {Express, Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from 'config';
import User from '../models/user';

async function register(req: Request, res: Response, next: NextFunction) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    User.create({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword
      },
      function (err, user) {
        if (err) return res.status(500).send("There was a problem registering the user.")
        // create a token
        var token = jwt.sign({ id: user._id }, config.get('privateKey'), {
          expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });
      }); 
  }


  async function getAdminId(req: Request, res: Response, next: NextFunction){
      let token:any = req.headers['x-access-token'];

      if (!token){
          return res.status(401).send({ auth: false, message: 'No token provided.' });
      } 

      jwt.verify(token, config.get('privateKey'), (err: any, decoded: any) => {
        if (err) 
        {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
    
        // res.status(200).send(decoded);
        User.findById(decoded.id, (err:any, user:any) => {
            if (err){
                return res.status(500).send("There was a problem finding the user.");
            }

            if(!user){
                return res.status(404).send("No user found.");
            }
            res.status(200).send(user);
        })
      })
  }


  export default {
      register, getAdminId
  }