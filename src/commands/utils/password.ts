import { LocaleNames, TaprisCommand } from "@framework/mod.ts";
import { generatePassword } from "@utils/mod.ts";
import {
    ActionRowComponent,
    ApplicationCommandOptionType,
    Embed,
    MessageComponentType,
} from "harmony/mod.ts";

interface PasswordLocale {
    createNew: string;
    delete: string;
}

const command = new TaprisCommand<PasswordLocale>()
    .setName("password")
    .setDescription("Password generator")
    .setOptions({
        name: "length",
        description: "Set length of password",
        type: ApplicationCommandOptionType.NUMBER,
        required: true,
    })
    .setLocales({
        en: {
            createNew: "Create new",
            delete: "Delete",
        },
        ru: {
            createNew: "Создать новый",
            delete: "Удалить",
        },
    })
    .setRun((client, interaction, locale) => {
        const passwordLength: number = interaction.options.find(
            (option) => option.name == "length",
        )?.value;

        const buttonsRow: ActionRowComponent = {
            type: MessageComponentType.ACTION_ROW,
            components: [
                {
                    type: MessageComponentType.BUTTON,
                    customID: `password_${passwordLength}`,
                    label: locale.createNew,
                    style: 1,
                },
                {
                    type: MessageComponentType.BUTTON,
                    customID: locale.delete,
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
