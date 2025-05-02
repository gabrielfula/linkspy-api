import prisma from "../configs/prisma";

export class UserRepository {
     constructor() {}
 
     async insert(data: any): Promise<any> {
          return await prisma.user.create({
               data,
          });
     }

     async findByUsername(username: string): Promise<any | null> {
          return await prisma.user.findUnique({
               where: {
                    email: username
               }
          });
     }
}