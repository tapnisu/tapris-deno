import { ActionRowComponent, Embed } from "harmony";
import { Component } from "@types";

const component: Component = {
  customId: /password_(.*)/gi,
  run: (client, interaction) => {
    interaction.defer();

    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";

    const passwordLength = Number(
      interaction.data.custom_id.replace(/password_/, ""),
    );

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

    interaction.editResponse({
      embeds: [embed],
      components: [buttonsRow],
    });
  },
};

export default component;
