import { TaprisCommand } from "@framework/mod.ts";
import { LocaleRecords } from "@typings/Locales.ts";
import {
    ActionRowComponent,
    ApplicationCommandOptionType,
    Embed,
} from "harmony/mod.ts";

interface LmgtfyLocale extends LocaleRecords {
  getAnswerButton: (query: string) => string;
}

const command = new TaprisCommand<LmgtfyLocale>().setName("lmgtfy")
  .setDescription(
    "'Let Me Google That For You' links generator",
  ).setOptions({
    name: "query",
    description: "Query, to generate link",
    type: ApplicationCommandOptionType.STRING,
    required: true,
  }).setLocales({
    en: {
      getAnswerButton: (query: string) => `Get answer for "${query}" question`,
    },
    ru: {
      getAnswerButton: (query: string) => `Получить ответ на вопрос "${query}"`,
    },
  }).setRun((client, interaction, locale) => {
    const query = interaction.options.find(
      (option) => option.name === "query",
    )?.value;

    const link = `https://lmgtfy.app/?q=${encodeURI(query.replace(/ /g, "+"))}`;

    const embed = new Embed()
      .setColor(client.botColor)
      .setTitle(link)
      .setURL(link);

    const buttonsRow: ActionRowComponent = {
      type: 1,
      components: [
        {
          type: 2,
          url: link,
          label: locale.getAnswerButton(query),
          style: 5,
        },
      ],
    };

    return interaction.reply({ embeds: [embed], components: [buttonsRow] });
  });

export default command;
