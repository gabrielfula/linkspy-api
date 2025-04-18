import { Link } from "@prisma/client";
import prisma from "../configs/prisma";

export class LinkRepository {
     constructor() {}
 
     async insert(data: any): Promise<Link> {
          return await prisma.link.create({
               data,
          });
     }

     async findByTrackCode(trackCode: string): Promise<Link | null> {
          return await prisma.link.findUnique({
               where: {
                    track_code: trackCode
               }
          });
     }

     async findLinksByUserId(userId: number, take?: number): Promise<Link[]> {
          return await prisma.link.findMany({
               where: {
                    user_id: userId,
               },
               orderBy: {
                    created_at: "desc",
               },
               ...(take ? { take } : {}),
          });
     }
}