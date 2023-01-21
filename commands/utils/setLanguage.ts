import { Command, LocaleNames } from "@types";
import { Embed } from "harmony";

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
      type: 3,
      required: true,
    },
  ],
  guildsOnly: true,
  run: async (client, interaction) => {
    const localesOld = await client.db.selectLocale(
      interaction.guild!.id,
      commandLocales,
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
      .setColor(client.env.BOT_COLOR)
      .setTitle(localesNew.success());

    return interaction.reply({ embeds: [embed] });
  },
};

export default command;
