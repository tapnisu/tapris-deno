import { Command } from "@types";
import generatePassword from "@utils/generatePassword.ts";
import { ActionRowComponent, Embed } from "harmony";

export const commandLocales = {
  en: {
    createNew: () => "Create new",
    delete: () => "Delete",
  },
  ru: {
    createNew: () => "Создать новый",
    delete: () => "Удалить",
  },
};

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
  run: async (client, interaction) => {
    const passwordLength: number = interaction.options.find(
      (option) => option.name == "length"
    )?.value;

    const locales = (await client.db.selectLocale(
      commandLocales,
      interaction.guild?.id
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
          customID: locales.delete(),
          label: "Delete",
          style: 4,
        },
      ],
    };

    const embed = new Embed()
      .setColor(client.env.BOT_COLOR)
      .setTitle("Password")
      .setDescription(`||${generatePassword(passwordLength)}||`);

    return interaction.reply({
      embeds: [embed],
      components: [buttonsRow],
    });
  },
};

export default command;
