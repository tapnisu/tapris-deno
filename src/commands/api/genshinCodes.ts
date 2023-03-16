import { CommandBuilder } from "@builders/mod.ts";
import { Code, LocaleRecords } from "@typings/mod.ts";
import { ActionRowComponent, Embed } from "harmony/mod.ts";

interface GenshinCodesLocales extends LocaleRecords {
  activateButton: () => string;
  embedTitle: () => string;
  description: () => string;
}

const command = new CommandBuilder<GenshinCodesLocales>().setName(
  "genshincodes",
).setDescription(
  "Get valid codes for Genshin Impact",
).setLocales({
  en: {
    activateButton: () => "Activate",
    embedTitle: () => "Codes for Genshin Impact",
    description: () => "You can activate them in game, and get rewards!",
  },
  ru: {
    activateButton: () => "Активировать",
    embedTitle: () => "Промокоды для Genshin Impact",
    description: () => "Вы можете активировать их в игре и получить награды!",
  },
}).setRun(async (client, interaction, locale) => {
  const response = await (
    await fetch(
      "https://raw.githubusercontent.com/ataraxyaffliction/gipn-json/main/gipn.json",
    )
  ).json();

  const codes = response.CODES;
  const url = "https://genshin.hoyoverse.com/en/gift";

  const embed = new Embed()
    .setColor(client.botColor)
    .setTitle(locale.embedTitle())
    .setDescription(locale.description())
    .setURL(url);

  codes.forEach((code: Code) => {
    if (code.is_expired == false) {
      let rewards: string[] = [];

      code.reward_array.forEach((reward) => {
        rewards = [...rewards, `${reward.name}: ${reward.count}`];
      });

      embed.addField(code.code, rewards.join("\n"), true);
    }
  });

  const buttonsRow: ActionRowComponent = {
    type: 1,
    components: [
      {
        type: 2,
        url: url,
        label: locale.activateButton(),
        style: 5,
      },
    ],
  };

  return interaction.reply({ embeds: [embed], components: [buttonsRow] });
});

export default command;
