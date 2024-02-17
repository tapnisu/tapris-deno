import { commandLocales } from "@commands/utils/password.ts";
import { TaprisComponent } from "@framework/mod.ts";
import { generatePassword } from "@utils/mod.ts";
import {
  ActionRowComponent,
  ButtonStyle,
  Embed,
  MessageComponentType,
} from "harmony/mod.ts";

export default new TaprisComponent()
  .setCustomId(/password_(.*)/gi)
  .setRun(async (client, interaction) => {
    await interaction.defer();

    const passwordLength = Number(
      interaction.data.custom_id.replace(/password_/, "")
    );

    const locales = await client.db.selectLocale(
      commandLocales,
      interaction.guild?.id
    );

    const buttonsRow: ActionRowComponent = {
      type: MessageComponentType.ACTION_ROW,
      components: [
        {
          type: MessageComponentType.BUTTON,
          customID: `password_${passwordLength}`,
          label: locales.createNew,
          style: ButtonStyle.PRIMARY,
        },
        {
          type: MessageComponentType.BUTTON,
          customID: "delete_message",
          label: locales.delete,
          style: ButtonStyle.DESTRUCTIVE,
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
      ephemeral: true,
    });
  });
