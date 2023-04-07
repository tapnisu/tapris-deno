import { TaprisComponent } from "@framework/mod.ts";

const component = new TaprisComponent().setCustomId(/delete_message/).setRun(
  (_client, interaction) => {
    const message = interaction.message;

    return message.delete();
  },
);

export default component;
