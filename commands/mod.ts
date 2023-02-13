// import genshin from "@commands/api/genshin.ts";
import genshinCodes from "@commands/api/genshinCodes.ts";
import manga from "@commands/api/manga.ts";
import coin from "@commands/fun/coin.ts";
import lmgtfy from "@commands/fun/lmgtfy.ts";
import help from "@commands/info/help.ts";
import avatar from "@commands/utils/avatar.ts";
import color from "@commands/utils/color.ts";
import colour from "@commands/utils/colour.ts";
import password from "@commands/utils/password.ts";
import profileLink from "@commands/utils/profileLink.ts";
import setLanguage from "@commands/utils/setLanguage.ts";
import user from "@commands/utils/user.ts";
import ExtendedClient from "@core";
import { Command } from "@types";

const Register = (client: ExtendedClient, command: Command) => {
  client.commands.set(command.name, command);
};

export default (client: ExtendedClient) => {
  // Register(client, genshin);
  Register(client, genshinCodes);
  Register(client, manga);
  Register(client, coin);
  Register(client, lmgtfy);
  Register(client, help);
  Register(client, avatar);
  Register(client, color);
  Register(client, colour);
  Register(client, password);
  Register(client, profileLink);
  Register(client, setLanguage);
  Register(client, user);
};
