import { TaprisCommand } from "@framework/mod.ts";
import {
    ActionRowComponent,
    ApplicationCommandOptionType,
    ButtonStyle,
    Embed,
    MessageComponentType,
} from "harmony/mod.ts";

interface AvatarLocale {
    unknownError: string;
    usersAvatar: (user: string) => string;
    link: string;
}

export default new TaprisCommand<AvatarLocale>()
    .setName("avatar")
    .setDescription("Get someones avatar")
    .setOptions({
        name: "user",
        description: "User to get avatar from",
        type: ApplicationCommandOptionType.USER,
        required: true,
    })
    .setLocales({
        en: {
            unknownError: "Unknown error happened! :(",
            usersAvatar: (user: string) => `${user}'s avatar`,
            link: "Link to avatar",
        },
        ru: {
            unknownError: "Произошла неизвестная ошибка! :(",
            usersAvatar: (user: string) => `Аватар ${user}`,
            link: "Ссылка",
        },
    })
    .setRun(async (client, interaction, locale) => {
        const user = await client.users.get(
            interaction.options.find((option) => option.name == "user")?.value,
        );

        if (!user) {
            return interaction.reply({
                embeds: [
                    new Embed()
                        .setColor(client.botColor)
                        .setTitle(locale.unknownError),
                ],
                ephemeral: true,
            });
        }

        const avatarURL = user.avatarURL("webp", 2048);

        const embed = new Embed()
            .setColor(client.botColor)
            .setTitle(locale.usersAvatar(user.tag))
            .setImage(avatarURL);

        const buttonsRow: ActionRowComponent = {
            type: MessageComponentType.ACTION_ROW,
            components: [
                {
                    type: MessageComponentType.BUTTON,
                    url: avatarURL,
                    label: locale.link,
                    style: ButtonStyle.LINK,
                },
            ],
        };

        return interaction.reply({ embeds: [embed], components: [buttonsRow] });
    });
