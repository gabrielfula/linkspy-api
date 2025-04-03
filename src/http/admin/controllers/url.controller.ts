import { Response, Request } from "express";
import { CreateLinkService } from "../../../services/create-link.service";
import { FetchLinkService } from "../../../services/fetch-link.service";
import { LinkSerializer } from "../response/url/url.response";

export async function track(req: Request, res: Response) {

     const url = await new FetchLinkService().track(req.body);

     console.log(url)
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