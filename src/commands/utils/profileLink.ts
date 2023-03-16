import { ApplicationCommandOptionType, Embed } from "harmony/mod.ts";
import { CommandBuilder } from "../../builders/mod.ts";
import { LocaleRecords } from "../../typings/mod.ts";

interface ProfileLinkLocales extends LocaleRecords {
  unknownError: () => string;
}

const command = new CommandBuilder<ProfileLinkLocales>()
  .setName("profilelink")
  .setDescription("Get link to share user using link")
  .setOptions(
    {
      name: "user",
      description: "User to get link for",
      type: ApplicationCommandOptionType.USER,
      required: true,
    },
  ).setLocales({
    en: {
      unknownError: () => "Unknown error happened! :(",
    },
    ru: {
      unknownError: () => "Произошла неизвестная ошибка! :(",
    },
  }).setRun(async (client, interaction, locale) => {
    const user = await client.users.get(
      interaction.options.find((option) => option.name == "user")?.value,
    );

    if (!user) {
      return interaction.reply({
        content: locale.unknownError(),
        ephemeral: true,
      });
    }

    const embed = new Embed()
      .setColor(client.botColor)
      .setTitle(`Link to ${user.tag}'s profile`)
      .setDescription(`\`https://discord.com/users/${user.id}\``)
      .setURL(`https://discord.com/users/${user.id}`);

    return interaction.reply({ embeds: [embed] });
  });

export default command;
