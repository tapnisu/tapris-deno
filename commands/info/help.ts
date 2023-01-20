import { Command } from "@types";
import { ApplicationCommandOptionBase, Embed } from "harmony";

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
  run: (client, interaction) => {
    const request = interaction.options.find(
      (option) => option.name == "command",
    )?.value;

    if (request) {
      const command = client.commands.get(request);

      if (!command)
        return interaction.reply({
          content: `${request} is not a valid command!`,
          ephemeral: true,
        });

      const embed = new Embed()
        .setColor(client.env.BOT_COLOR)
        .setTitle(command.name);

      if (command.description) embed.setDescription(command.description);

      command.options?.forEach((option) => {
        embed.addFields({
          name: `${option.name}`,
          value: option.description ? option.description : "none",
          inline: true,
        });
      });

      return interaction.reply({ embeds: [embed] });
    }

    const embed = new Embed()
      .setColor(client.env.BOT_COLOR)
      .setDescription(`Server member: ${interaction.guild?.name}`);

    embed
      .setTitle(client.user ? client.user.username : "Tapris")
      .setThumbnail(
        client.user
          ? client.user.avatarURL()
          : "https://raw.githubusercontent.com/tapris-bot/tapris/main/assets/avatar.png"
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
                    option.required ? "(required) " : ""
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
