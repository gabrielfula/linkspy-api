import { User } from "@prisma/client";
import { HttpError } from "../../errors/exception";
import { UserRepository } from "../../repositories/user.repository";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export class LoginService {
     private userRepository: UserRepository;

     constructor() {
          this.userRepository = new UserRepository();
     }
 
     public async index(data: any): Promise<any> {

          const user = await this.userRepository.findByUsername(data.username);

          if (!user) {
               throw new HttpError("Credenciais inválidas", 400);
          }

          await this.validateCredentials(user.password, data.password);

          const token = this.generateToken();

          return { user, token };
     }

     public async create(data: any): Promise<any> {
          const user = await this.userRepository.findByUsername(data.username);

          if (user) {
               throw new HttpError("O E-mail informado já está sendo usado!", 400);
          }

          data.password = await this.generateHash(data.password);

          const userCreated = await this.save(data);

          return userCreated;
     }

     private async validateCredentials(originalPassword: string, password: string): Promise<boolean> {
          const isMatch = await bcrypt.compare(password, originalPassword);

          if (!isMatch) {
               throw new HttpError("Credenciais inválidas", 400);
          }

          return isMatch;
     }

     protected generateToken(): string {
          return jwt.sign({
               exp: Math.floor(Date.now() / 1000) + (60 * 60),
               data: 'foobar'
          }, process.env.JWT_SECRET!);
     }

     protected async generateHash(password: string): Promise<string> {
          const saltRounds = 10;
          const hash       = await bcrypt.hash(password, saltRounds);
          return hash; 
     }

     private async save(data: any): Promise<User | null> {
          const dataUser = {
              name:     data.name,
              email:    data.username,
              password: data.password,
          };
      
          try {
              const userCreated = await this.userRepository.insert(dataUser);

              return userCreated;
          } catch (error) {
              throw new HttpError("Erro ao criar usuário", 500);
          }
     }
}