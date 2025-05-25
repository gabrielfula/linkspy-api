import { Link } from "@prisma/client";
import prisma from "../configs/prisma";
import { LinkEntity } from "../entities/link.entity";

export class LinkRepository {
     constructor() {}
 
     async insert(data: any): Promise<any> {
          return await prisma.link.create({
               data,
          });
     }

     async findByTrackCode(trackCode: string): Promise<LinkEntity | null> {
          return await prisma.link.findUnique({
               where: {
                    track_code: trackCode
               }, include: {
                    locations: true
               }
          });
     }

     async findLinksByUserId(userId: number, take?: number): Promise<LinkEntity[]> {
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

     async findByUuid(uuid: string): Promise<Link | null> {
          return await prisma.link.findUnique({
               where: {
                    uuid
               },
               include: {
                    locations: true
               }
          });
     }
}