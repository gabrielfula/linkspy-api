import { Location } from "@prisma/client";
import prisma from "../configs/prisma";

export class LocationRepository {
     constructor() {}
 
     async insert(data: any): Promise<Location> {
          return await prisma.location.create({
               data,
          });
     }

     // async findByTrackCode(trackCode: string): Promise<Location | null> {
     //      return await prisma.link.findUnique({
     //           where: {
     //                track_code: trackCode
     //           }
     //      });
     // }
}