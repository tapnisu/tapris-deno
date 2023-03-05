import { Command } from "@interfaces/mod.ts";
import { ApplicationCommandOptionBase, Embed } from "harmony/mod.ts";

const commandLocales = {
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
};

const command: Command = {
  name: "help",
  description: "Get info about commands",
  options: [
    {
      name: "command",
      description: "Name of command to get info",
      type: 3,
      required: false,
    },
  ],
  run: async (client, interaction) => {
    const request = interaction.options.find(
      (option) => option.name == "command",
    )?.value;

    const locales = (await client.db.selectLocale(
      commandLocales,
      interaction.guild?.id,
    )) as typeof commandLocales.en;

    if (request) {
      const command = client.commands.get(request);

      if (!command) {
        return interaction.reply({
          content: locales.isNotAValidCommand(request),
          ephemeral: true,
        });
      }

      const embed = new Embed()
        .setColor(client.botColor)
        .setTitle(command.name);

      if (command.description) embed.setDescription(command.description);

      command.options?.forEach((option) => {
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
      .setDescription(locales.serverMember(interaction.guild?.name));

    embed
      .setTitle(client.user ? client.user.username : "Tapris")
      .setThumbnail(
        client.user
          ? client.user.avatarURL()
          : "https://raw.githubusercontent.com/tapris-bot/tapris/main/assets/avatar.png",
      );

    client.commands.forEach((command: Command) => {
      embed.addFields({
        name: `/${command.name} ${
          command.options
            ? Array.prototype.map
              .call(
                command.options,
                (option: ApplicationCommandOptionBase) =>
                  `<${
                    option.required ? locales.required() : ""
                  }${option.name} [${option.description}]>`,
              )
              .join(" ")
            : ""
        }`,
        value: command.description ? command.description : "...",
        inline: true,
      });
    });

    return interaction.reply({ embeds: [embed] });
  },
};

export default command;
