import { LocaleRecords, TaprisCommand } from "@framework/mod.ts";
import {
  ApplicationCommandOption,
  ApplicationCommandOptionBase,
  ApplicationCommandOptionType,
  Embed,
} from "harmony/mod.ts";

interface HelpLocale extends LocaleRecords {
  isNotAValidCommand: (request: string) => string;
  serverMember: (name?: string) => string;
  required: () => string;
}

export default new TaprisCommand<HelpLocale>()
  .setName("help")
  .setDescription("Get info about commands")
  .setOptions({
    name: "command",
    description: "Name of command to get info",
    type: ApplicationCommandOptionType.STRING,
    required: false,
  })
  .setLocales({
    en: {
      isNotAValidCommand: (request: string) =>
        `${request} is not a valid command!`,
      serverMember: (name?: string) =>
        name ? `Server member: ${name}` : "List of my commands",
      required: () => "(required) ",
    },
    ru: {
      isNotAValidCommand: (request: string) =>
        `Команда ${request} не существует!`,
      serverMember: (name?: string) =>
        name ? `Участник сервера: ${name}` : "Список моих команд",

      required: () => "(обязателен) ",
    },
  })
  .setRun((client, interaction, locale) => {
    const request = interaction.options.find(
      (option) => option.name === "command"
    )?.value;

    if (request) {
      const command = client.commands.get(request);

      if (!command) {
        return interaction.reply({
          embeds: [
            new Embed()
              .setColor(client.botColor)
              .setTitle(locale.isNotAValidCommand(request)),
          ],
          ephemeral: true,
        });
      }

      const embed = new Embed()
        .setColor(client.botColor)
        .setTitle(command.name);

      if (command.description) embed.setDescription(command.description);

      command.options.forEach((option: ApplicationCommandOption) => {
        embed.addFields({
          name: option.name,
          value: option.description,
          inline: true,
        });
      });

      return interaction.reply({ embeds: [embed] });
    }

    const embed = new Embed()
      .setColor(client.botColor)
      .setDescription(locale.serverMember(interaction.guild?.name));

    embed
      .setTitle(client.user!.username)
      .setThumbnail(client.user!.avatarURL());

    client.commands.forEach((command: TaprisCommand<undefined>) => {
      embed.addFields({
        name: `/${command.name} ${
          command.options
            ? Array.prototype.map
                .call(
                  command.options,
                  (option: ApplicationCommandOptionBase) =>
                    `<${option.required ? locale.required() : ""}${
                      option.name
                    } [${option.description}]>`
                )
                .join(" ")
            : ""
        }`,
        value: command.description,
        inline: true,
      });
    });

    return interaction.reply({ embeds: [embed] });
  });
