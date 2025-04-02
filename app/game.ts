// game.ts
import { decode, encode } from "@msgpack/msgpack";
import { App, DISABLED } from "uWebSockets.js";
import { Peer, outer_packets } from "./game/outer_packets";

export class GameServer {
  private peers: Peer[] = [];

  constructor(port: number) {
    App({})
      .ws("/*", {
        compression: DISABLED,
        open: (ws) => {
          this.peers.push({
            // Add ...args to capture parameters
            send: (msg) => {
              // Pass args to outer_packets[msg] and include the result as the second element
              ws.send(encode(msg), true);
            },
          });

          this.peers[0].send(
            outer_packets.say(true, "Hey! If you see this, everything works!")
          );
        },
        message: (_, msg) => {
          const packet = decode(msg);
          console.log(packet);
        },
      })
      .listen(port, () => {});
  }
}
