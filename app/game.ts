import { WebSocketServer } from "ws";
import { decode } from "@msgpack/msgpack";

export class GameServer {
  private wss: WebSocketServer;

  constructor(port: number) {
    //for scalability, we don't hardcode port
    this.wss = new WebSocketServer({ port: port });

    this.wss.on("connection", (ws) => {
      ws.on("message", (msg: Uint8Array) => {
        const packet = decode(msg);
        console.log(packet);
      });
    });
  }
}
