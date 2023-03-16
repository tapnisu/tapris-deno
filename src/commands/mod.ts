import genshinCodes from "@commands/api/genshinCodes.ts";
import manga from "@commands/api/manga.ts";
import coin from "@commands/fun/coin.ts";
import lmgtfy from "@commands/fun/lmgtfy.ts";
import help from "@commands/info/help.ts";
import avatar from "@commands/utils/avatar.ts";
import color from "@commands/utils/color.ts";
import password from "@commands/utils/password.ts";
import profileLink from "@commands/utils/profileLink.ts";
import setLanguage from "@commands/utils/setLanguage.ts";
import user from "@commands/utils/user.ts";
import ExtendedClient from "@core";

const commands = [
  genshinCodes,
  manga,
  coin,
  lmgtfy,
  help,
  avatar,
  color,
  password,
  profileLink,
  setLanguage,
  user,
];

export type CommandCollectionType = typeof commands[number];

export default (client: ExtendedClient) =>
  commands.forEach((c) => client.commands.set(c.name, c));
