import { Command, SearchResult } from "@interfaces/mod.ts";
import { ActionRowComponent, Embed } from "harmony/mod.ts";

const commandLocales = {
  en: {
    mangaNotFound: () => "Sorry! Manga not found! :(",
    lastChapter: () => "Last chapter",
    readManga: () => "Read manga",
  },
  ru: {
    mangaNotFound: () => "Извините! Манга не найдена! :(",
    lastChapter: () => "Последняя глава",
    readManga: () => "Читать мангу",
  },
};

const command: Command = {
  name: "manga",
  description: "Get data about manga",
  options: [
    {
      name: "query",
      description: "Query for search",
      type: 3,
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const query = interaction.options.find(
      (option) => option.name == "query",
    )?.value;

    const locales = (await client.db.selectLocale(
      commandLocales,
      Number(interaction.guild?.id),
    )) as typeof commandLocales.en;

    const response: SearchResult[] = await (
      await fetch(`https://manga.deno.dev/api/search?q=${encodeURI(query)}`)
    ).json();

    if (response.length == 0) {
      return interaction.reply({
        content: locales.mangaNotFound(),
        ephemeral: true,
      });
    }

    const embed = new Embed()
      .setColor(client.env.BOT_COLOR)
      .setTitle(response[0].name)
      .addFields({
        name: locales.lastChapter(),
        value: response[0].lastChapter,
        inline: true,
      })
      .setImage(response[0].thumbnail)
      .setURL(response[0].url)
      .setAuthor({ name: response[0].author });

    const buttonsRow: ActionRowComponent = {
      type: 1,
      components: [
        {
          type: 2,
          url: response[0].url,
          label: locales.readManga(),
          style: 5,
        },
      ],
    };

    return interaction.reply({ embeds: [embed], components: [buttonsRow] });
  },
};

export default command;
