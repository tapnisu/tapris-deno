import ExtendedClient from "../core.ts";
import { Command } from "../types/mod.ts";
import genshin from "./api/genshin.ts";
import genshinCodes from "./api/genshinCodes.ts";
import manga from "./api/manga.ts";
import coin from "./fun/coin.ts";
import lmgtfy from "./fun/lmgtfy.ts";
import help from "./info/help.ts";
import avatar from "./utils/avatar.ts";
import password from "./utils/password.ts";
import user from "./utils/user.ts";

const Register = (client: ExtendedClient, command: Command) => {
  client.commands.set(command.name, command);
};

export default (client: ExtendedClient) => {
  Register(client, genshin);
  Register(client, genshinCodes);
  Register(client, coin);
  Register(client, help);
  Register(client, password);
  Register(client, avatar);
  Register(client, user);
  Register(client, manga);
  Register(client, lmgtfy);
};
