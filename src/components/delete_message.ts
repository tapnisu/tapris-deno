import { TaprisComponent } from "@framework/mod.ts";

export default new TaprisComponent()
  .setCustomId(/delete_message/)
  .setRun((_client, interaction) => interaction.message.delete());
