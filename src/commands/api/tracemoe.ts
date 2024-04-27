import { TaprisCommand } from "@framework/mod.ts";
import {
  ActionRowComponent,
  ApplicationCommandOptionType,
  ButtonStyle,
  Embed,
  MessageComponentType,
} from "harmony/mod.ts";

interface SearchResult {
  frameCount: number;
  error: string;
  result: Result[];
}

export interface Result {
  anilist: number;
  filename: string;
  episode: number;
  from: number;
  to: number;
  similarity: number;
  video: string;
  image: string;
}

interface TracemoeLocales {
  frameNotFound: string;
  similarity: string;
  episode: string;
  watch: string;
}

export default new TaprisCommand<TracemoeLocales>()
  .setName("tracemoe")
  .setDescription("Get exact moment and the episode for screenshot from anime")
  .setOptions({
    name: "url",
    description: "Url to image",
    type: ApplicationCommandOptionType.STRING,
    required: true,
  })
  .setLocales({
    en: {
      frameNotFound: "Sorry, I can't find this frame",
      similarity: "Similarity",
      episode: "Episode",
      watch: "Watch",
    },
    ru: {
      frameNotFound: "Извините, я не могу найти этот кадр",
      similarity: "Схожести",
      episode: "Эпизод",
      watch: "Смотреть",
    },
  })
  .setRun(async (client, interaction, locale) => {
    const url = interaction.options.find(
      (option) => option.name == "url",
    )?.value;

    await interaction.defer();

    const res = await fetch(
      `https://api.trace.moe/search?url=${encodeURI(url)}`,
    );
    const data: SearchResult = await res.json();

    if (!data) return;
    if (data.result.length === 0) {
      return interaction.reply({
        embeds: [
          new Embed().setColor(client.botColor).setTitle(locale.frameNotFound),
        ],
        ephemeral: true,
      });
    }

    const frame = data.result[0];

    const embed = new Embed()
      .setColor(client.botColor)
      .setTitle(frame.filename)
      .addFields(
        {
          name: locale.similarity,
          value: `${frame.similarity}%`,
          inline: true,
        },
        {
          name: locale.episode,
          value: frame.episode.toString(),
          inline: true,
        },
      )
      .setImage(frame.image)
      .setURL(frame.video)
      .setVideo(frame.video);

    const buttonsRow: ActionRowComponent = {
      type: MessageComponentType.ACTION_ROW,
      components: [
        {
          type: MessageComponentType.BUTTON,
          url: frame.video,
          label: locale.watch,
          style: ButtonStyle.LINK,
        },
      ],
    };

    return interaction.reply({ embeds: [embed], components: [buttonsRow] });
  });
