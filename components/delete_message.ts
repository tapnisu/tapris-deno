import { Component } from "@typings/mod.ts";

const component: Component = {
  customId: /delete_message/,
  run: (_client, interaction) => {
    const message = interaction.message;

    return message.delete();
  },
};

export default component;
