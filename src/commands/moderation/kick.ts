import { TaprisCommand } from "@framework/mod.ts";
import {
  ApplicationCommandOptionType,
  Embed,
  PermissionFlags,
} from "harmony/mod.ts";

interface KickLocale {
  success: (userTag: string) => string;
  failure: (userTag: string) => string;
}

export default new TaprisCommand<KickLocale>()
  .setName("kick")
  .setDescription("Kick selected member")
  .setOptions(
    {
      name: "member",
      description: "Member to be kicked",
      type: ApplicationCommandOptionType.USER,
      required: true,
    },
    {
      name: "reason",
      description: "Reason for kick",
      type: ApplicationCommandOptionType.STRING,
      required: false,
    }
  )
  .setMemberPermissions(PermissionFlags.KICK_MEMBERS)
  .setLocales({
    en: {
      success: (userTag: string) => `${userTag} got kicked`,
      failure: (userTag: string) => `You can't kick ${userTag}`,
    },
    ru: {
      success: (userTag: string) => `${userTag} был удалён`,
      failure: (userTag: string) => `Вы не можете выгнать ${userTag}`,
    },
  })
  .setGuildOnly()
  .setRun(async (client, interaction, locale) => {
    const member = await interaction.guild?.members.fetch(
      interaction.options.find((option) => option.name == "member")?.value
    );
    const reason: string | undefined = interaction.options.find(
      (option) => option.name == "reason"
    )?.value;

    if (!(await member!.kickable(interaction.member))) {
      return interaction.reply({
        embeds: [
          new Embed({
            title: member!.user.tag,
          }),
        ],
        ephemeral: true,
      });
    }

    await member!.kick(reason);

    const embed = new Embed()
      .setColor(client.botColor)
      .setTitle(locale.success(member!.user.tag));

    return interaction.reply({ embeds: [embed] });
  });
