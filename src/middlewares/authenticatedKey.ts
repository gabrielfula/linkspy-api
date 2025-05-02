import { NextFunction, Request, Response } from "express";
import crypto from "crypto";

export const AuthenticatedKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
     const receivedToken = req.headers["api-key"] as string | undefined;

     if (!receivedToken) {
          res.status(401).json({ success: false, message: 'Token não fornecido' });
     }

     const expectedPlainText = process.env.API_KEY_SECRET!;

     const expectedToken = sha256(expectedPlainText);

     if (receivedToken !== expectedToken) {
          res.status(401).json({ success: false, message: 'Token inválido ou expirado' });
     }

     next();
};

const sha256 = (data: string): string => {
    return crypto.createHash('sha256').update(data).digest('hex');
};
