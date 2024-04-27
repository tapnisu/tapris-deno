import { TaprisCommand } from "@framework/mod.ts";
import { Embed } from "harmony/mod.ts";

type MemoryFormats = "Bytes" | "KiB" | "MiB" | "GiB" | "TiB" | "PiB";

const formatSize = (amount: number): `${string} ${MemoryFormats}` => {
  let i = 0;
  const type: MemoryFormats[] = ["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB"];

  while ((amount / 1024) | 0 && i < type.length - 1) {
    amount /= 1024;

    i++;
  }

  return `${amount.toFixed(2)} ${type[i]}`;
};

interface InfoLocale {
  embedTitle: string;
  description: string;
  amountOfGuilds: string;
  author: string;
  ping: string;
  memoryUsage: string;
}

export default new TaprisCommand<InfoLocale>()
  .setName("info")
  .setDescription("Get info about me")
  .setLocales({
    en: {
      embedTitle: "Info about me",
      description: "Multi-language, multi-purpose bot for Discord",
      amountOfGuilds: "Amount of guilds",
      author: "Author",
      ping: "Ping",
      memoryUsage: "Memory usage",
    },
    ru: {
      embedTitle: "Информация обо мне",
      description: "Многоязычный, многоцелевой бот для Discord",
      amountOfGuilds: "Количество серверов",
      author: "Автор",
      ping: "Задержка",
      memoryUsage: "Использование ОЗУ",
    },
  })
  .setRun(async (client, interaction, locale) => {
    const embed = new Embed()
      .setColor(client.botColor)
      .setTitle(locale.embedTitle)
      .setDescription(locale.description)
      .addFields(
        {
          name: locale.author,
          value: `<@${client.authorId}>`,
          inline: true,
        },
        {
          name: locale.amountOfGuilds,
          value: `${await client.getGuildsAmount()}`,
          inline: true,
        },
        {
          name: locale.ping,
          value: client.gateway.ping.toString(),
          inline: true,
        },
      );

    if (Deno.memoryUsage) {
      embed.addField({
        name: locale.memoryUsage,
        value: formatSize(Deno.memoryUsage().rss),
        inline: true,
      });
    }

    return interaction.reply({ embeds: [embed] });
  });
