import { CommandBuilder } from "@builders/mod.ts";
import { LocaleRecords } from "@typings/mod.ts";
import { ApplicationCommandOptionType, Embed } from "harmony/mod.ts";
import translate from "translate";

interface TranslateLocale extends LocaleRecords {
  invalidLanguage: () => string;
  textIn: (language: string) => string;
  origLang: () => string;
  origMessage: () => string;
}

const command = new CommandBuilder<TranslateLocale>().setName("translate")
  .setDescription(
    "Translates text",
  ).setOptions(
    {
      name: "language",
      description: "Target language",
      type: ApplicationCommandOptionType.STRING,
      required: true,
    },
    {
      name: "text",
      description: "Text to be translated",
      type: ApplicationCommandOptionType.STRING,
      required: true,
    },
  ).setLocales({
    en: {
      invalidLanguage: () => "Error, language is invalid!",
      textIn: (language: string) => `Text in ${language}`,
      origLang: () => "Original language",
      origMessage: () => "Original message",
    },
    ru: {
      invalidLanguage: () => "Я не могу найти этот язык!",
      textIn: (language: string) => `Текст на ${language} языке`,
      origLang: () => "Язык оригинала",
      origMessage: () => "Оригинальное сообщение",
    },
  }).setRun(async (client, interaction, locale) => {
    const language = interaction.options.find((option) =>
      option.name === "language"
    )?.value;
    const text = interaction.options.find((option) => option.name === "text")
      ?.value;

    try {
      const response = await translate(text, { to: language });

      await interaction.defer();

      const embed = new Embed()
        .setColor(client.botColor)
        .setTitle(locale.textIn(language))
        .setDescription(response.text)
        .addFields(
          {
            name: locale.origLang(),
            value: response.from.language.iso,
            inline: true,
          },
          {
            name: locale.origMessage(),
            value: text,
            inline: true,
          },
        );

      return await interaction.reply({ embeds: [embed] });
    } catch {
      return await interaction.reply({
        embeds: [
          new Embed().setTitle(locale.invalidLanguage()).setColor(
            client.botColor,
          ),
        ],
        ephemeral: true,
      });
    }
  });

export default command;
