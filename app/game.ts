import { decode } from "@msgpack/msgpack";
import { App } from "uWebSockets.js";

export class GameServer {
  constructor(port: number) {
    //for scalability, we don't hardcode port
    App({})
      .ws("/*", {
        message: (_, msg) => {
          const packet = decode(msg);
          console.log(packet);
        },
      })
      .listen(port, () => {});
  }
}
