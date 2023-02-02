import ExtendedClient from "@core";
import { Event } from "@types";
import { Interaction } from "harmony";

const event: Event = {
  name: "interactionCreate",
  run: async (client: ExtendedClient, interaction: Interaction) => {
    if (interaction.isApplicationCommand()) {
      const command = client.commands.get(interaction.name);

      if (command) {
        if (command.guildsOnly && !interaction.guild) {
          return await interaction.reply({
            content: "Sorry, this command is only for guilds.",
            ephemeral: true,
          });
        }

        return command.run(client, interaction);
      }
    }

    if (interaction.isMessageComponent()) {
      const component = client.components.find((component) =>
        component.customId.test(interaction.data.custom_id)
      );

      if (component) return component.run(client, interaction);
    }
  },
};

export default event;
