import { Response, Request } from "express";
import { LinkSerializer } from "../response/url/url.response";
import { FetchLinkService } from "../../../services/link/fetch-link.service";
import { CreateLinkService } from "../../../services/link/create-link.service";


export async function track(req: Request, res: Response) {

     const userIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

     const url = await new FetchLinkService().track(req.params.track_code, req.body, userIp);

     res.json({ 
          "sucess": true,
     });
};

export async function create(req: Request, res: Response) {

     const url = await new CreateLinkService().index(req.body);

     res.json({ 
          "sucess": true,
          "url": LinkSerializer.serialize(url)
     });
};

export async function list(req: Request, res: Response) {

     const user_id = 1; /* Passar esse valor para sempre buscar pelo user, como se fosse um filtro */

     res.json({
          "user": "Usuário teste", 
          "url": [
               {
                    "url1": "url1.com.br",
               },
               {
                    "url2": "url2.com.br",
               },
               {
                    "url3": "url3.com.br",
               }
          ]
     });
};


export default {
     track,
     create,
     list
}