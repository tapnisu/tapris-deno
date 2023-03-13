import ExtendedClient from "@core";
import {
  ApplicationCommandInteraction,
  ApplicationCommandOption,
  SlashCommandInteraction
} from "harmony/mod.ts";

interface Run {
  (
    client: ExtendedClient,
    interaction: SlashCommandInteraction,
  ): Promise<ApplicationCommandInteraction>;
}

export interface Command {
  name: string;
  description?: string;
  options?: ApplicationCommandOption[];
  guildsOnly?: boolean;
  run: Run;
}
