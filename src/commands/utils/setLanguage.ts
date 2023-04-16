import { LocaleNames, LocaleRecords, TaprisCommand } from "@framework/mod.ts";
import { ApplicationCommandOptionType, Embed } from "harmony/mod.ts";

interface SetLanguageLocale extends LocaleRecords {
  notAdministrator: () => string;
  success: () => string;
}

export default new TaprisCommand<SetLanguageLocale>()
  .setName("setlanguage")
  .setDescription("Set my language for this guild")
  .setOptions({
    name: "language",
    description: "Your selection",
    choices: [
      { name: "English", value: "en" },
      { name: "Russian", value: "ru" },
    ],
    type: ApplicationCommandOptionType.STRING,
    required: true,
  })
  .setLocales({
    en: {
      notAdministrator: () => "You don't have administrator permissions!",
      success: () => "Language set to english!",
    },
    ru: {
      notAdministrator: () => "У вас нет прав администратора!",
      success: () => "Язык установлен на русский!",
    },
  })
  .setGuildOnly()
  .setRun(async (client, interaction, locale) => {
    const userMember = await interaction.guild!.members.get(
      interaction.user.id
    );

    if (!userMember!.permissions.has("Administrator")) {
      return await interaction.reply({
        embeds: [
          new Embed()
            .setColor(client.botColor)
            .setTitle(locale.notAdministrator()),
        ],
        ephemeral: true,
      });
    }

    const language = interaction.options.find(
      (option) => option.name === "language"
    )?.value as LocaleNames;

    await client.db.setGuildLanguage(interaction.guild!.id, language);

    const embed = new Embed().setColor(client.botColor).setTitle(":thumbsup:");

    return interaction.reply({ embeds: [embed] });
  });


