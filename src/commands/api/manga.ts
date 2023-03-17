import { CommandBuilder } from "@builders/mod.ts";
import { LocaleRecords } from "@typings/Locales.ts";
import { SearchResult } from "@typings/mod.ts";
import {
  ActionRowComponent,
  ApplicationCommandOptionType,
  Embed,
} from "harmony/mod.ts";

interface MangaLocales extends LocaleRecords {
  mangaNotFound: () => string;
  lastChapter: () => string;
  readManga: () => string;
}

const command = new CommandBuilder<MangaLocales>().setName("manga")
  .setDescription(
    "Get data about manga",
  ).setOptions({
    name: "query",
    description: "Query for search",
    type: ApplicationCommandOptionType.STRING,
    required: true,
  }).setLocales({
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
  }).setRun(async (client, interaction, locale) => {
    const query = interaction.options.find(
      (option) => option.name == "query",
    )?.value;

    const response: SearchResult[] = await (
      await fetch(`https://manga.deno.dev/api/search?q=${encodeURI(query)}`)
    ).json();

    if (response.length == 0) {
      return interaction.reply({
        embeds: [
          new Embed()
            .setColor(client.botColor)
            .setTitle(locale.mangaNotFound()),
        ],
        ephemeral: true,
      });
    }

    const embed = new Embed()
      .setColor(client.botColor)
      .setTitle(response[0].name)
      .addFields({
        name: locale.lastChapter(),
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
          label: locale.readManga(),
          style: 5,
        },
      ],
    };

    return interaction.reply({ embeds: [embed], components: [buttonsRow] });
  });

export default command;
