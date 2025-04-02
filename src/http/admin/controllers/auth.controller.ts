import { randomUUID } from "crypto";
import { Response, Request } from "express";

export async function login(req: Request, res: Response) {
     res.json({
          "token": randomUUID(),
     });
};


export default {
     login,
}