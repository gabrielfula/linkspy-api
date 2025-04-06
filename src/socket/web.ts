import { Server } from "socket.io";

export class WebSocketService {
     private static io: Server;

     static init(server: any) {
          this.io = new Server(server, {
               cors: { origin: "*" }
          });
     }

     static emit(event: string, data: any) {
          if (this.io) {
               this.io.emit(event, data);
          }
     }
}
