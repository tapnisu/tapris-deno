import ExtendedClient from "@core";
import {
  ApplicationCommandInteraction,
  CommandBuilder as HarmonyCommandBuilder,
  SlashCommandInteraction,
} from "harmony/mod.ts";

interface Run {
  (
    client: ExtendedClient,
    interaction: SlashCommandInteraction,
  ): Promise<ApplicationCommandInteraction>;
}

export class CommandBuilder extends HarmonyCommandBuilder {
  run!: Run;

  public setRun(run: Run) {
    this.run = run;
  }
}
