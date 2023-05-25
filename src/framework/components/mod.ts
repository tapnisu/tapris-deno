import { TaprisClient } from "@core/mod.ts";
import { Interaction, MessageComponentInteraction } from "harmony/mod.ts";

export type ComponentRun = (
  client: TaprisClient,
  interaction: MessageComponentInteraction
) => Promise<Interaction | void> | void;

export class TaprisComponent {
  customId = /id/;
  run: ComponentRun = () => {};

  public setCustomId(customId: RegExp) {
    this.customId = customId;

    return this;
  }

  public setRun(run: ComponentRun) {
    this.run = run;

    return this;
  }
}
