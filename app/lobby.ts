import { WebSocketServer } from "ws";
import config from "./config";

type Packet =
  | ["set_location", string]
  | ["date", number]
  | ["set_flag", string]
  | ["ask", { token: string; question: "captcha"; request_id: number }]
  | ["play", { noob: boolean; mode: "fun"; mmtag: string; location: string }];

export class LobbyServer {
  private wss = new WebSocketServer({ port: config.lobby.port });

  public constructor() {
    this.wss.on("listening", () => console.log("started lobby server"));

    this.wss.on("connection", (ws) => {
      const answer = (data: any) => ws.send(JSON.stringify(data));

      ws.on("message", (data: Packet) => {
        data = JSON.parse(data as any) as Packet;

        switch (data[0]) {
          case "ask":
            if (data[1].question == "captcha")
              answer(["response", { request_id: data[1].request_id }]); // no captcha lol
        }
      });
    });
  }
}

export let lobby = new LobbyServer();
