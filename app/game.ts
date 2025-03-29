import { WebSocketServer } from "ws";

export class GameServer {
  private wss: WebSocketServer;

  constructor(port: number) {
    //for scalability, we don't hardcode port
    this.wss = new WebSocketServer({ port: port });
  }
}
