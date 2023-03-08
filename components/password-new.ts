import { ComponentBuilder } from "@builders/mod.ts";
import { commandLocales } from "@commands/utils/password.ts";
import generatePassword from "@utils/generatePassword.ts";
import { ActionRowComponent, Embed } from "harmony/mod.ts";

const component = new ComponentBuilder().setCustomId(/password_(.*)/gi).setRun(
  async (client, interaction) => {
    await interaction.defer();

    const passwordLength = Number(
      interaction.data.custom_id.replace(/password_/, ""),
    );

    const locales = (await client.db.selectLocale(
      commandLocales,
      interaction.guild?.id,
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
      .setColor(client.botColor)
      .setTitle("Password")
      .setDescription(`||${generatePassword(passwordLength)}||`);

    interaction.editResponse({
      embeds: [embed],
      components: [buttonsRow],
    });
  },
);

export default component;
