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
               throw new HttpError("Credenciais inválidas", 401);
          }

          await this.validateCredentials(user.password, data.password);

          const token = this.generateToken();

          return { user, token };
     }

     private async validateCredentials(originalPassword: string, password: string): Promise<boolean> {
          const isMatch = await bcrypt.compare(password, originalPassword);

          if (!isMatch) {
               throw new HttpError("Credenciais inválidas", 401);
          }

          return isMatch;
     }

     private generateToken(): string {
          return jwt.sign({
               exp: Math.floor(Date.now() / 1000) + (60 * 60),
               data: 'foobar'
          }, process.env.JWT_SECRET!);
     }
}