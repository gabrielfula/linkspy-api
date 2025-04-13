import { Response, Request } from "express";
import { LinkSerializer } from "../response/url/url.response";
import { FetchLinkService } from "../../../services/link/fetch-link.service";
import { CreateLinkService } from "../../../services/link/create-link.service";
import { WebSocketService } from "../../../socket/web";
import { Link } from "@prisma/client";


export async function track(req: Request, res: Response) {
     const userIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
     const url = await new FetchLinkService().track(req.body, userIp);
 
     if (url?.redirectTo) {
          WebSocketService.emit('location-tracked', {
               trackCode: req.params.track_code,
               locationId: url.locationId,
               latitude: req.body.latitude,
               longitude: req.body.longitude
          });

          res.status(200).json({ success: true, redirect: url.redirectTo });
     }
 
     res.status(400).json({ success: false, error: "Falha ao rastrear" });
}

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

export async function getRecentUrl(req: Request, res: Response) {

     const user_id = 1;
     const url     = await new FetchLinkService().getLastLinksById(user_id);

     res.json({ 
          "sucess": true,
          "url": url.map((item: Link) => LinkSerializer.serialize(item))
     });
};

export default {
     track,
     create,
     list,
     getRecentUrl
}