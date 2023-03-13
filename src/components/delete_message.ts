import { ComponentBuilder } from "@builders/mod.ts";

const component = new ComponentBuilder().setCustomId(/delete_message/).setRun(
  (_client, interaction) => {
    const message = interaction.message;

    return message.delete();
  },
);

export default component;
