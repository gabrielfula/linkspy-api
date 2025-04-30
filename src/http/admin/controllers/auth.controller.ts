import { Response, Request } from "express";
import { LoginService } from "../../../services/login/login.service";
import { validateDto } from "../../../middlewares/validateDto";
import { LoginDTO } from "../dtos/auth/login.dto";
import { RegisterDTO } from "../dtos/auth/register.dto";

export async function login(req: Request, res: Response) {

     const { user, token } = await new LoginService().index(req.body);

     res.json({
          id:       user.id,
          success:  true,
          email:    user.email,
          name:     user.name,
          token:    token
     });
};

export async function register(req: Request, res: Response) {
     const user = await new LoginService().create(req.body);

     res.json({
          success: true,
          email: user.email,
          name: user.name,
     });
}

export default {
     login: [validateDto(LoginDTO), login],
     register: [validateDto(RegisterDTO), register],
};