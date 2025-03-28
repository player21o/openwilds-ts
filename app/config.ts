//this is a config

export default {
  lobby: {
    port: 8080, //the *localhost* port for lobby
  },
  game: {
    port: 8081, //the *localhost* port for game
    url: "localhost", //the url of the game which client will connect to
  },
} as Config;

type Config = {
  lobby: {
    port: number;
  };
  game: {
    port: number;
    url: string | "localhost";
  };
};
