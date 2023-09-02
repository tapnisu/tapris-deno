import { LocaleNames, TaprisCommand } from "@framework/mod.ts";
import {
  ApplicationCommandOptionType,
  Embed,
  PermissionFlags,
} from "harmony/mod.ts";

export default new TaprisCommand()
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
  .setMemberPermissions(PermissionFlags.ADMINISTRATOR)
  .setGuildOnly()
  .setRun(async (client, interaction, _locale) => {
    const language = interaction.options.find(
      (option) => option.name == "language",
    )?.value as LocaleNames;

    await client.db.setGuildLanguage(interaction.guild!.id, language);

    const embed = new Embed().setColor(client.botColor).setTitle(":thumbsup:");

    return interaction.reply({ embeds: [embed] });
  });
