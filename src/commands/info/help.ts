import { TaprisCommand } from "@framework/mod.ts";
import { ApplicationCommandOptionType, Embed } from "harmony/mod.ts";

interface HelpLocale {
  isNotAValidCommand: (request: string) => string;
  serverMember: (name?: string) => string;
  required: string;
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
      required: "(required) ",
    },
    ru: {
      isNotAValidCommand: (request: string) =>
        `Команда ${request} не существует!`,
      serverMember: (name?: string) =>
        name ? `Участник сервера: ${name}` : "Список моих команд",

      required: "(обязателен) ",
    },
  })
  .setRun((client, interaction, locale) => {
    const request: string = interaction.options.find(
      (option) => option.name == "command"
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
        .setTitle(command.name)
        .addFields(
          ...command.options.map((option) => ({
            name: option.name,
            value: option.description,
            inline: true,
          }))
        );

      if (command.description) embed.setDescription(command.description);

      return interaction.reply({ embeds: [embed] });
    }

    const embed = new Embed()
      .setTitle(client.user!.username)
      .setThumbnail(client.user!.avatarURL())
      .setColor(client.botColor)
      .setDescription(locale.serverMember(interaction.guild?.name))
      .addFields(
        ...client.commands.map((command) => ({
          name: `/${command.name} ${
            command.options
              ? command.options
                  .map(
                    (option) =>
                      `<${option.required ? locale.required : ""}${
                        option.name
                      } [${option.description}]>`
                  )
                  .join(" ")
              : ""
          }`,
          value: command.description,
          inline: true,
        }))
      );

    return interaction.reply({ embeds: [embed] });
  });
