import { Response, Request } from "express";

export async function check(req: Request, res: Response) {
     res.json({
          success: true,
          message: "API is healthy"
     });
}

export default {
    check
};