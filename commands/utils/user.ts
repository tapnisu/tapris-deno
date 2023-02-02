import { Command } from "@types";
import { Embed, User } from "harmony";

const commandLocales = {
  en: {
    unknownError: () => "Unknown error happened! :(",
    bot: () => "`bot`",
  },
  ru: {
    unknownError: () => "Произошла неизвестная ошибка! :(",
    bot: () => "`бот`",
  },
};

const command: Command = {
  name: "user",
  description: "Sends user information",
  options: [
    {
      name: "user",
      description: "User to be shown",
      type: 6,
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const user: User | undefined = await client.users.get(
      interaction.options.find((option) => option.name == "user")?.value,
    );

    const locales = (await client.db.selectLocale(
      interaction.guild?.id,
      commandLocales,
    )) as typeof commandLocales.en;

    if (!user) {
      return interaction.reply({
        content: locales.unknownError(),
        ephemeral: true,
      });
    }

    const embed = new Embed()
      .setColor(client.env.BOT_COLOR)
      .setTitle(`${user.tag} ${user.bot ? locales.bot() : ""}`)
      .setThumbnail(user.avatarURL())
      .addFields({ name: "ID", value: user.id, inline: true });

    return interaction.reply({ embeds: [embed] });
  },
};

export default command;
