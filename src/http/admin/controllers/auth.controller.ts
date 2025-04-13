import { Response, Request } from "express";
import { LoginService } from "../../../services/login/login.service";

export async function login(req: Request, res: Response) {

     const { user, token } = await new LoginService().index(req.body);

     res.json({ 
          email: user.email,
          name: user.name,
          token 
     });
};

export async function register(req: Request, res: Response) {
     const user = await new LoginService().create(req.body);

     res.json({ 
          email: user.email,
          name: user.name,
     });
}

export default {
     login,
     register
}