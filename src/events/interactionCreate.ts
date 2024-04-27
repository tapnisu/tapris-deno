import { TaprisClient } from "@core/mod.ts";
import { TaprisEvent } from "@framework/mod.ts";
import { Embed, Interaction } from "harmony/mod.ts";

export default new TaprisEvent<"interactionCreate">()
  .setName("interactionCreate")
  .setRun(async (client: TaprisClient, interaction: Interaction) => {
    if (interaction.isApplicationCommand()) {
      const command = client.commands.get(interaction.name);

      if (!command) return;

      if (command.guildOnly && !interaction.guild) {
        return await interaction.reply({
          embeds: [
            new Embed()
              .setColor(client.botColor)
              .setTitle("Sorry, this command is only for guilds"),
          ],
          ephemeral: true,
        });
      }

      if (
        !interaction.member?.permissions.has(command.memberPermissions, true)
      ) {
        return await interaction.reply({
          embeds: [
            new Embed()
              .setColor(client.botColor)
              .setTitle(
                "Sorry, you don't have permission to run this commands",
              ),
          ],
          ephemeral: true,
        });
      }

      const locale = await client.db.selectLocale(
        command.locales,
        interaction.guild?.id,
      );

      return await command.run(client, interaction, locale).catch(async (e) => {
        console.error(e);

        await interaction.reply("Unknown error happened!");
      });
    }

    if (interaction.isMessageComponent()) {
      const component = client.components.find((component) =>
        component.customId.test(interaction.data.custom_id)
      );

      if (!component) return;

      return await component
        .run(client, interaction)
        ?.catch((e) => console.error(e));
    }
  });
