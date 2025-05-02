import prisma from "../configs/prisma";

export class LocationRepository {
     constructor() {}
 
     async insert(data: any): Promise<any> {
          return await prisma.location.create({
               data,
          });
     }
}