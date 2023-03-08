import Client from "@core";
import { Interaction, MessageComponentInteraction } from "harmony/mod.ts";

interface Run {
  (
    client: Client,
    interaction: MessageComponentInteraction,
  ): Promise<Interaction | void> | void;
}

export class ComponentBuilder {
  public customId = /id/;
  public run: Run = () => {};

  public setCustomId(customId: RegExp) {
    this.customId = customId;

    return this;
  }

  public setRun(run: Run) {
    this.run = run;

    return this;
  }
}
