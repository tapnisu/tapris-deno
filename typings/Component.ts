import Client from "@core";
import { Interaction, MessageComponentInteraction } from "harmony/mod.ts";

interface Run {
  (
    client: Client,
    interaction: MessageComponentInteraction,
  ): Promise<Interaction | void> | void;
}

export interface Component {
  customId: RegExp;
  run: Run;
}
