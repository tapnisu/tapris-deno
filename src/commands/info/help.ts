import { TaprisCommands } from "@commands/mod.ts";
import { LocaleRecords } from "@typings/mod.ts";
import {
  ApplicationCommandOption,
  ApplicationCommandOptionBase,
  ApplicationCommandOptionType,
  Embed,
} from "harmony/mod.ts";
import { CommandBuilder } from "../../framework/mod.ts";

interface HelpLocale extends LocaleRecords {
  isNotAValidCommand: (request: string) => string;
  serverMember: (name?: string) => string;
  required: () => string;
}

const command = new CommandBuilder<HelpLocale>()
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

      command.options?.forEach((option: ApplicationCommandOption) => {
        embed.addFields({
          name: `${option.name}`,
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
      .setTitle(client.user ? client.user.username : "Tapris")
      .setThumbnail(
        client.user
          ? client.user.avatarURL()
          : "https://raw.githubusercontent.com/tapris-bot/tapris/main/assets/avatar.webp"
      );

    client.commands.forEach((command: TaprisCommands) => {
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
        value: command.description ? command.description : "...",
        inline: true,
      });
    });

    return interaction.reply({ embeds: [embed] });
  });

export default command;
