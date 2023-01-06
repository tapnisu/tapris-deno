import ExtendedClient from "@core";
import {
  ApplicationCommandInteraction,
  ApplicationCommandOption,
  SlashCommandInteraction
} from "harmony";

interface Run {
  (
    client: ExtendedClient,
    interaction: SlashCommandInteraction,
  ): Promise<ApplicationCommandInteraction | undefined>;
}

type ApplicationCommandOptionExtended = ApplicationCommandOption & {
  required: boolean;
};

export interface Command {
  name: string;
  description?: string;
  options?: ApplicationCommandOptionExtended[];
  guildsOnly?: boolean;
  run: Run;
}
