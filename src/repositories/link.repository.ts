import prisma from "../configs/prisma";

export class LinkRepository {
     constructor() {}
 
     async insert(data: any): Promise<any> {
          return await prisma.link.create({
               data,
          });
     }

     async findByTrackCode(trackCode: string): Promise<any | null> {
          return await prisma.link.findUnique({
               where: {
                    track_code: trackCode
               }
          });
     }

     async findLinksByUserId(userId: number, take?: number): Promise<any[]> {
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

     async findByUuid(uuid: string): Promise<any | null> {
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