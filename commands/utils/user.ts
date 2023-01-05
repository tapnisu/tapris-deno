import { Command } from "@types";
import { Embed, User } from "harmony";

const command: Command = {
  name: "user",
  description: "Sends user information",
  options: [
    {
      name: "user",
      description: "User to be shown",
      type: 6,
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const user: User | undefined = await client.users.get(
      interaction.options.find((option) => option.name == "user")?.value,
    );

    if (!user) {
      return interaction.reply({
        content: "Unkown error happend :(",
        ephemeral: true,
      });
    }

    const embed = new Embed()
      .setColor(client.env.BOT_COLOR)
      .setTitle(`${user.tag} ${user.bot ? "[bot]" : ""}`)
      .setThumbnail(user.avatarURL())
      .addFields({ name: "Id", value: user.id, inline: true });

    return interaction.reply({ embeds: [embed] });
  },
};

export default command;
