import { Component } from "@types";

const component: Component = {
  customId: /delete_message/,
  run: (_client, interaction) => {
    const message = interaction.message;

    return message.delete();
  },
};

export default component;
