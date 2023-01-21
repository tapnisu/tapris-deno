import { Code, Command } from "@types";
import { ActionRowComponent, Embed } from "harmony";

const commandLocales = {
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
};

const command: Command = {
  name: "genshincodes",
  description: "Get valid codes for Genshin Impact",
  run: async (client, interaction) => {
    const response = await (
      await fetch(
        "https://raw.githubusercontent.com/ataraxyaffliction/gipn-json/main/gipn.json",
      )
    ).json();

    const locales = (await client.db.selectLocale(
      interaction.guild!.id,
      commandLocales,
    )) as typeof commandLocales.en;

    const codes = response.CODES;
    const url = "https://genshin.hoyoverse.com/en/gift";

    const embed = new Embed()
      .setColor(client.env.BOT_COLOR)
      .setTitle(locales.embedTitle())
      .setDescription(locales.description())
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
          label: locales.activateButton(),
          style: 5,
        },
      ],
    };

    return interaction.reply({ embeds: [embed], components: [buttonsRow] });
  },
};

export default command;
