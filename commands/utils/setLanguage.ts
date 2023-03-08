import { Command, LocaleNames } from "@typings/mod.ts";
import { ApplicationCommandOptionType, Embed } from "harmony/mod.ts";

const commandLocales = {
  en: {
    notAdministrator: () => "You don't have administrator permissions!",
    success: () => "Language set to english!",
  },
  ru: {
    notAdministrator: () => "У вас нет прав администратора!",
    success: () => "Язык установлен на русский!",
  },
};

const command: Command = {
  name: "setlanguage",
  description: "Set my language for this guild",
  options: [
    {
      name: "language",
      description: "Your selection",
      choices: [
        { name: "English", value: "en" },
        { name: "Russian", value: "ru" },
      ],
      type: ApplicationCommandOptionType.STRING,
      required: true,
    },
  ],
  guildsOnly: true,
  run: async (client, interaction) => {
    const localesOld = await client.db.selectLocale(
      commandLocales,
      interaction.guild?.id,
    );

    const userMember = await interaction.guild!.members.get(
      interaction.user.id,
    );

    if (!userMember!.permissions.has("Administrator")) {
      return await interaction.reply({
        content: localesOld.notAdministrator(),
        ephemeral: true,
      });
    }

    const language = interaction.options.find(
      (option) => option.name == "language",
    )?.value as LocaleNames;

    await client.db.setGuildLanguage(interaction.guild!.id, language);

    const localesNew = commandLocales[language]
      ? commandLocales[language]
      : commandLocales.en;

    const embed = new Embed()
      .setColor(client.botColor)
      .setTitle(localesNew.success());

    return interaction.reply({ embeds: [embed] });
  },
};

export default command;
