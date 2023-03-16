import ExtendedClient from "@core";
import {
  ApplicationCommandInteraction,
  CommandBuilder as HarmonyCommandBuilder,
  SlashCommandInteraction
} from "harmony/mod.ts";
import { Locales } from "../typings/Locales.ts";

interface Run {
  (
    client: ExtendedClient,
    interaction: SlashCommandInteraction,
  ): Promise<ApplicationCommandInteraction>;
}

export class CommandBuilder extends HarmonyCommandBuilder {
  run!: Run;
  locales!: Locales;

  public setRun(run: Run) {
    this.run = run;
    return this;
  }

  public setLocales(locales: Locales) {
    this.locales = locales;
    return this;
  }
}
