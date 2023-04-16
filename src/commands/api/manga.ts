import { TaprisCommand } from "@framework/mod.ts";
import {
  ActionRowComponent,
  ApplicationCommandOptionType,
  Embed,
} from "harmony/mod.ts";
import ky from "ky";

interface SearchResult {
  id: string;
  name: string;
  lastChapter: string;
  thumbnail: string;
  author: string;
  url: string;
}

interface MangaLocales {
  mangaNotFound: string;
  lastChapter: string;
  readManga: string;
}

export default new TaprisCommand<MangaLocales>()
  .setName("manga")
  .setDescription("Get data about manga")
  .setOptions({
    name: "query",
    description: "Query for search",
    type: ApplicationCommandOptionType.STRING,
    required: true,
  })
  .setLocales({
    en: {
      mangaNotFound: "Sorry! Manga not found! :(",
      lastChapter: "Last chapter",
      readManga: "Read manga",
    },
    ru: {
      mangaNotFound: "Извините! Манга не найдена! :(",
      lastChapter: "Последняя глава",
      readManga: "Читать мангу",
    },
  })
  .setRun(async (client, interaction, locale) => {
    const query = interaction.options.find(
      (option) => option.name === "query"
    )?.value;

    const response: SearchResult[] = await (
      await ky.get(`https://manga.deno.dev/api/search?q=${encodeURI(query)}`)
    ).json();

    if (response.length === 0) {
      return interaction.reply({
        embeds: [
          new Embed().setColor(client.botColor).setTitle(locale.mangaNotFound),
        ],
        ephemeral: true,
      });
    }

    const embed = new Embed()
      .setColor(client.botColor)
      .setTitle(response[0].name)
      .addFields({
        name: locale.lastChapter,
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
          label: locale.readManga,
          style: 5,
        },
      ],
    };

    return interaction.reply({ embeds: [embed], components: [buttonsRow] });
  });
