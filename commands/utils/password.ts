import { Command } from "@types";
import { ActionRowComponent, Embed } from "harmony";

const command: Command = {
  name: "password",
  description: "Password generator",
  options: [
    {
      name: "length",
      description: "Set length of password",
      type: 4,
      required: true,
    },
  ],
  run: (client, interaction) => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";

    const passwordLength: number = interaction.options.find(
      (option) => option.name == "length",
    )?.value;

    for (let i = 0, n = charset.length; i < passwordLength; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }

    const buttonsRow: ActionRowComponent = {
      type: 1,
      components: [
        {
          type: 2,
          customID: `password_${passwordLength}`,
          label: "Create new",
          style: 1,
        },
        {
          type: 2,
          customID: "delete_message",
          label: "Delete",
          style: 4,
        },
      ],
    };

    const embed = new Embed()
      .setColor(client.env.BOT_COLOR)
      .setTitle("Password")
      .setDescription(password);

    return interaction.reply({
      embeds: [embed],
      components: [buttonsRow],
    });
  },
};

export default command;
