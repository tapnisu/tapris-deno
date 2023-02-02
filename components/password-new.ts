import { commandLocales } from "@commands/utils/password.ts";
import { Component } from "@types";
import { ActionRowComponent, Embed } from "harmony";

const component: Component = {
  customId: /password_(.*)/gi,
  run: async (client, interaction) => {
    await interaction.defer();

    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";

    const passwordLength = Number(
      interaction.data.custom_id.replace(/password_/, ""),
    );

    for (let i = 0, n = charset.length; i < passwordLength; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }

    const locales = (await client.db.selectLocale(
      interaction.guild?.id,
      commandLocales,
    )) as typeof commandLocales.en;

    const buttonsRow: ActionRowComponent = {
      type: 1,
      components: [
        {
          type: 2,
          customID: `password_${passwordLength}`,
          label: locales.createNew(),
          style: 1,
        },
        {
          type: 2,
          customID: "delete_message",
          label: locales.delete(),
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
