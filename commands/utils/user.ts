import { Command } from "@interfaces/mod.ts";
import { Embed } from "harmony/mod.ts";

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

    const embed = new Embed()
      .setColor(client.botColor)
      .setTitle(`${user.tag} ${user.bot ? locales.bot() : ""}`)
      .setThumbnail(user.avatarURL())
      .setURL(`https://discord.com/users/${user.id}`)
      .addFields({ name: "ID", value: user.id, inline: true });

    return interaction.reply({ embeds: [embed] });
  },
};

export default command;
