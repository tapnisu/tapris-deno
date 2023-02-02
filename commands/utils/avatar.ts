import { Command } from "@types";
import { ActionRowComponent, Embed } from "harmony";

const commandLocales = {
  en: {
    unknownError: () => "Unknown error happened! :(",
    usersAvatar: (user: string) => `${user}'s avatar`,
    link: () => "Link to avatar",
  },
  ru: {
    unknownError: () => "Произошла неизвестная ошибка! :(",
    usersAvatar: (user: string) => `Аватар ${user}`,
    link: () => "Ссылка",
  },
};

const command: Command = {
  name: "avatar",
  description: "Get someones avatar",
  options: [
    {
      name: "user",
      description: "User to get avatar from",
      type: 6,
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const user = await client.users.get(
      interaction.options.find((option) => option.name == "user")?.value,
    );

    const locales = (await client.db.selectLocale(
      commandLocales,
      interaction.guild?.id,
    )) as typeof commandLocales.en;

    if (!user) {
      return interaction.reply({
        content: locales.unknownError(),
        ephemeral: true,
      });
    }

    const avatarUrl = user.avatarURL("png", 2048);

    const embed = new Embed()
      .setColor(client.env.BOT_COLOR)
      .setTitle(locales.usersAvatar(user.tag))
      .setImage(avatarUrl);

    const buttonsRow: ActionRowComponent = {
      type: 1,
      components: [
        {
          type: 2,
          url: avatarUrl,
          label: locales.link(),
          style: 5,
        },
      ],
    };

    return interaction.reply({ embeds: [embed], components: [buttonsRow] });
  },
};

export default command;
