import config from "./config";
import { GameServer } from "./game";
import { lobby } from "./lobby";

const s = lobby;

const game_server = new GameServer(config.game.port);
