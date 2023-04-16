import { LocaleRecords, TaprisCommand } from "@framework/mod.ts";
import { Embed } from "harmony/mod.ts";

interface InfoLocale extends LocaleRecords {
  embedTitle: () => string;
  description: () => string;
  amountOfGuilds: () => string;
  author: () => string;
  ping: () => string;
}

const command = new TaprisCommand<InfoLocale>()
  .setName("info")
  .setDescription("Get info about me")
  .setLocales({
    en: {
      embedTitle: () => "Info about me",
      description: () => "Multi-language, multi-purpose bot for Discord",
      amountOfGuilds: () => "Amount of guilds",
      author: () => "Author",
      ping: () => "Ping",
    },
    ru: {
      embedTitle: () => "Информация обо мне",
      description: () => "Многоязычный, многоцелевой бот для Discord",
      amountOfGuilds: () => "Количество серверов",
      author: () => "Автор",
      ping: () => "Задержка",
    },
  })
  .setRun(async (client, interaction, locale) => {
    const embed = new Embed()
      .setColor(client.botColor)
      .setTitle(locale.embedTitle())
      .setDescription(locale.description())
      .addFields(
        { name: locale.author(), value: "<@586128640136445964>", inline: true },
        {
          name: locale.amountOfGuilds(),
          value: `${await client.getGuildsAmount()}`,
          inline: true,
        },
        {
          name: locale.ping(),
          value: client.gateway.ping.toString(),
          inline: true,
        }
      );

    return interaction.reply({ embeds: [embed] });
  });

export default command;
