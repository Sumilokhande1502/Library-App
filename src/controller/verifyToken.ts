import { Express, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import df from '../default/default';

async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token:any = req.headers['x-access-token'];
  let userId = req.params;
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
    
  jwt.verify(token, df.privateKey, function(err:any, decoded:any) {
    if (err)
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
    // if everything good, save to request for use in other routes
    userId = decoded.id;
    next();
  });
}


export default verifyToken;