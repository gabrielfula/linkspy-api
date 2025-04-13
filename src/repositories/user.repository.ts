import { User } from "@prisma/client";
import prisma from "../configs/prisma";

export class UserRepository {
     constructor() {}
 
     async insert(data: any): Promise<User> {
          return await prisma.user.create({
               data,
          });
     }

     async findByUsername(username: string): Promise<User | null> {
          return await prisma.user.findUnique({
               where: {
                    email: username
               }
          });
     }
}