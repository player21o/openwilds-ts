// game.ts
import { decode, encode } from "@msgpack/msgpack";
import { App, DISABLED } from "uWebSockets.js";
import { Peer, outer_packets } from "./game/outer_packets";
import { Ws, inner_packets } from "./game/inner_packets";

export class GameServer {
  private peers: Peer[] = [];
  private peer_id_count: number = 0;

  constructor(port: number) {
    App({})
      .ws("/*", {
        compression: DISABLED,
        open: (ws: Ws) => {
          this.peers.push({
            send: (msg) => {
              ws.send(encode(msg), true);
            },
          });

          this.peers[0].send(
            outer_packets.say(true, "Hey! If you see this, everything works!")
          );

          ws.id = this.peer_id_count;

          this.peer_id_count += 1;
        },
        message: (ws: Ws, msg) => {
          const packet: [keyof typeof inner_packets, any] = decode(msg) as any;
          //console.log(packet);
          inner_packets[packet[0]](
            ws,
            typeof packet[1] === "object" &&
              !Array.isArray(packet[1]) &&
              packet[1] !== null
              ? packet[1]
              : [...packet[1]]
          );
        },
      })
      .listen(port, () => {});
  }
}
