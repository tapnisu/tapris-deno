import ExtendedClient from "@core";
import {
  ApplicationCommandInteraction, ApplicationCommandOption,
  InteractionResponse,
  SlashCommandInteraction
} from "harmony";

interface Run {
  (
    client: ExtendedClient,
    interaction: SlashCommandInteraction,
  ): Promise<InteractionResponse | ApplicationCommandInteraction>;
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
