import genshinCodes from "@commands/api/genshinCodes.ts";
import manga from "@commands/api/manga.ts";
import tracemoe from "@commands/api/tracemoe.ts";
import coin from "@commands/fun/coin.ts";
import lmgtfy from "@commands/fun/lmgtfy.ts";
import help from "@commands/info/help.ts";
import avatar from "@commands/utils/avatar.ts";
import clear from "@commands/utils/clear.ts";
import color from "@commands/utils/color.ts";
import password from "@commands/utils/password.ts";
import profileLink from "@commands/utils/profileLink.ts";
import setLanguage from "@commands/utils/setLanguage.ts";
import translate from "@commands/utils/translate.ts";
import user from "@commands/utils/user.ts";
import { TaprisClient } from "@core/mod.ts";
import { TaprisCommand } from "@framework/mod.ts";

const commands = [
  genshinCodes,
  manga,
  coin,
  lmgtfy,
  help,
  clear,
  avatar,
  color,
  password,
  tracemoe,
  profileLink,
  setLanguage,
  user,
  translate,
];

export const getCommands = (client: TaprisClient) =>
  commands.forEach((c) =>
    client.commands.set(c.name, c as TaprisCommand<undefined>)
  );
