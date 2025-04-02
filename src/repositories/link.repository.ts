import { Link } from "@prisma/client";
import prisma from "../configs/prisma";

export class LinkRepository {
     constructor() {}
 
     async insert(data: any): Promise<Link> {
          return await prisma.link.create(data);
     }
}