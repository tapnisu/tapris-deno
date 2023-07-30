import { TaprisCommand } from "@framework/mod.ts";
import {
    ActionRowComponent,
    ButtonStyle,
    Embed,
    MessageComponentType,
} from "harmony/mod.ts";
import ky from "ky";

const ACTIVATE_GIFT_URL = "https://genshin.hoyoverse.com/en/gift";

export interface CodesResponse {
    CODES: Code[];
}

export interface Code {
    reward: string;
    date: string;
    code: string;
    is_expired: boolean;
    region: number;
    reward_array: RewardArray[];
}

export interface RewardArray {
    image_path: string;
    name: string;
    count: string;
    rarity: string;
}

interface GenshinCodesLocale {
    activateButton: string;
    embedTitle: string;
    description: string;
}

export default new TaprisCommand<GenshinCodesLocale>()
    .setName("genshincodes")
    .setDescription("Get valid codes for Genshin Impact")
    .setLocales({
        en: {
            activateButton: "Activate",
            embedTitle: "Codes for Genshin Impact",
            description: "You can activate them in game, and get rewards!",
        },
        ru: {
            activateButton: "Активировать",
            embedTitle: "Промокоды для Genshin Impact",
            description: "Вы можете активировать их в игре и получить награды!",
        },
    })
    .setRun(async (client, interaction, locale) => {
        const res: CodesResponse = await ky
            .get(
                "https://raw.githubusercontent.com/ataraxyaffliction/gipn-json/main/gipn.json",
            )
            .json();

        const embed = new Embed()
            .setColor(client.botColor)
            .setTitle(locale.embedTitle)
            .setDescription(locale.description)
            .setURL(ACTIVATE_GIFT_URL);

        res.CODES.forEach((code: Code) => {
            if (!code.is_expired) {
                embed.addField(
                    code.code,
                    code.reward_array
                        .map((reward) => `${reward.count} ${reward.name}`)
                        .join("\n"),
                    true,
                );
            }
        });

        const buttonsRow: ActionRowComponent = {
            type: MessageComponentType.ACTION_ROW,
            components: [
                {
                    type: MessageComponentType.BUTTON,
                    url: ACTIVATE_GIFT_URL,
                    label: locale.activateButton,
                    style: ButtonStyle.LINK,
                },
            ],
        };

        return interaction.reply({ embeds: [embed], components: [buttonsRow] });
    });
