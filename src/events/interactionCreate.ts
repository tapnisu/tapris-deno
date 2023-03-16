import { EventBuilder } from "@builders/mod.ts";
import ExtendedClient from "@core";
import { Interaction } from "harmony/mod.ts";

const event = new EventBuilder().setName("interactionCreate").setRun(
  async (client: ExtendedClient, interaction: Interaction) => {
    if (interaction.isApplicationCommand()) {
      const command = client.commands.get(interaction.name);

      if (!command) return;

      if (command.guildOnly && !interaction.guild) {
        return await interaction.reply({
          content: "Sorry, this command is only for guilds.",
          ephemeral: true,
        });
      }

      const locale = await client.db.selectLocale(
        command.locales,
        interaction.guild?.id,
      );

      // deno-lint-ignore no-explicit-any
      return await command.run(client, interaction, locale as any).catch(
        async (e) => {
          console.error(e);

          await interaction.reply("Unknown error happened!");
        },
      );
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
  },
);

export default event;
