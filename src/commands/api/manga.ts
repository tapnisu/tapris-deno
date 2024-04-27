import { TaprisCommand } from "@framework/mod.ts";
import {
  ActionRowComponent,
  ApplicationCommandOptionType,
  ButtonStyle,
  Embed,
  MessageComponentType,
} from "harmony/mod.ts";

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
      (option) => option.name == "query",
    )?.value;

    const res = await fetch(`https://manga.deno.dev/api/search?q=${encodeURI(query)}`);
    const data: SearchResult[] = await res.json();

    if (data.length === 0) {
      return interaction.reply({
        embeds: [
          new Embed().setColor(client.botColor).setTitle(locale.mangaNotFound),
        ],
        ephemeral: true,
      });
    }

    const embed = new Embed()
      .setColor(client.botColor)
      .setTitle(data[0].name)
      .addFields({
        name: locale.lastChapter,
        value: data[0].lastChapter,
        inline: true,
      })
      .setImage(data[0].thumbnail)
      .setURL(data[0].url)
      .setAuthor({ name: data[0].author });

    const buttonsRow: ActionRowComponent = {
      type: MessageComponentType.ACTION_ROW,
      components: [
        {
          type: MessageComponentType.BUTTON,
          url: data[0].url,
          label: locale.readManga,
          style: ButtonStyle.LINK,
        },
      ],
    };

    return interaction.reply({ embeds: [embed], components: [buttonsRow] });
  });
