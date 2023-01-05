import Client from "@core";
import { Interaction, MessageComponentInteraction } from "harmony";

interface Run {
  (client: Client, interaction: MessageComponentInteraction):
    | Promise<Interaction>
    | Promise<void>
    | void;
}

export interface Component {
  customId: RegExp;
  run: Run;
}
