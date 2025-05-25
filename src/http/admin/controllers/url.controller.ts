import { Response, Request } from "express";
import { LinkSerializer } from "../response/url/url.response";
import { FetchLinkService } from "../../../services/link/fetch-link.service";
import { CreateLinkService } from "../../../services/link/create-link.service";

import { LinkDetailsSerializer } from "../response/url/url-details.response";
import { validateDto } from "../../../middlewares/validateDto";
import { CreateUrlDTO } from "../dtos/url/create-url.dto";


export async function track(req: Request, res: Response) {
     const userIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
     const url    = await new FetchLinkService().track(req.body, userIp);

     res.status(200).json({ success: true, redirect: url.redirectTo });
}

export async function create(req: Request, res: Response) {

     const userId = req.headers["x-account-code"];
     const url    = await new CreateLinkService().index(req.body, parseInt(userId as string));

     res.json({ 
          success: true,
          url: LinkSerializer.serialize(url)
     });
};

export async function list(req: Request, res: Response) {

     const userId = req.headers["x-account-code"];
     const url    = await new FetchLinkService().index(parseInt(userId as string));

     res.json({ 
          success: true,
          url: url.map((item: any) => LinkSerializer.serialize(item))
     });
};

export async function getRecentUrl(req: Request, res: Response) {

     const userId = req.headers["x-account-code"];
     const url    = await new FetchLinkService().getLastLinksById(parseInt(userId as string));

     res.json({ 
          success: true,
          url: url.map((item: any) => LinkSerializer.serialize(item))
     });
};

export async function details(req: Request, res: Response) {

     const url = await new FetchLinkService().getByUuid(req.params.uuid);

     res.json({ 
          success: true,
          url: LinkDetailsSerializer.serialize(url)
     });
};

export default {
     track,
     create: [validateDto(CreateUrlDTO), create],
     list,
     details,
     getRecentUrl
}