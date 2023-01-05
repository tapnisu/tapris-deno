import { Command, Component, Event } from "@types";
import { Interaction } from "harmony";

const event: Event = {
  name: "interactionCreate",
  run: (client, interaction: Interaction) => {
    if (interaction.isApplicationCommand()) {
      const command = client.commands.get(interaction.name);
      if (command) (command as Command).run(client, interaction);

      return;
    }

    if (interaction.isMessageComponent()) {
      const component = client.components.find((component) =>
        component.customId.test(interaction.data.custom_id)
      );
      if (component) (component as Component).run(client, interaction);

      return;
    }
  },
};

export default event;
