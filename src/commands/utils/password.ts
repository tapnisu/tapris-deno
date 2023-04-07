import { CommandBuilder } from "@framework/mod.ts";
import { LocaleNames, LocaleRecords } from "@typings/mod.ts";
import generatePassword from "@utils/generatePassword.ts";
import {
  ActionRowComponent,
  ApplicationCommandOptionType,
  Embed,
} from "harmony/mod.ts";

interface PasswordLocale extends LocaleRecords {
  createNew: () => string;
  delete: () => string;
}

const command = new CommandBuilder<PasswordLocale>().setName("password")
  .setDescription(
    "Password generator",
  ).setOptions({
    name: "length",
    description: "Set length of password",
    type: ApplicationCommandOptionType.NUMBER,
    required: true,
  }).setLocales({
    en: {
      createNew: () => "Create new",
      delete: () => "Delete",
    },
    ru: {
      createNew: () => "Создать новый",
      delete: () => "Удалить",
    },
  }).setRun((client, interaction, locale) => {
    const passwordLength: number = interaction.options.find(
      (option) => option.name === "length",
    )?.value;

    const buttonsRow: ActionRowComponent = {
      type: 1,
      components: [
        {
          type: 2,
          customID: `password_${passwordLength}`,
          label: locale.createNew(),
          style: 1,
        },
        {
          type: 2,
          customID: locale.delete(),
          label: "Delete",
          style: 4,
        },
      ],
    };

    const embed = new Embed()
      .setColor(client.botColor)
      .setTitle("Password")
      .setDescription(`||${generatePassword(passwordLength)}||`);

    return interaction.reply({
      embeds: [embed],
      components: [buttonsRow],
    });
  });

export default command;

export const commandLocales = command.locales as Record<
  LocaleNames,
  PasswordLocale
>;
