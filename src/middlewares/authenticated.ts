import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const AuthenticatedMiddleware = (req: Request, res: Response, next: NextFunction) => {
     if (!req.headers["authorization"]) {
          res.status(401).json({ success: false, message: 'Token não fornecido' });
     } else {
          const token = getToken(req);

          if (!token) {
               res.status(401).json({ success: false, message: 'Token não fornecido' });
          } else {
               try {
                    jwt.verify(token, process.env.JWT_SECRET!);
                    next();
               } catch (error) {
                    res.status(401).json({ success: false, message: 'Token inválido ou expirado' });
               }
          }
     }
};

const getToken = (req: Request) => {
    const authHeader = req.headers["authorization"]!;
    return authHeader.split(" ")[1];
};
