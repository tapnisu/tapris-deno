import ExtendedClient from "@core";
import { Locales } from "@typings/mod.ts";
import {
  ApplicationCommandInteraction,
  ApplicationCommandOption,
  SlashCommandInteraction,
} from "harmony/mod.ts";

interface Run {
  (
    client: ExtendedClient,
    interaction: SlashCommandInteraction,
  ): Promise<ApplicationCommandInteraction>;
}

export class CommandBuilder {
  name = "";
  description = "";
  options: ApplicationCommandOption[] = [];
  guildsOnly = false;

  run!: Run;
  locales!: Locales;

  public setName(name: string) {
    this.name = name;
    return this;
  }

  public setDescription(description: string) {
    this.description = description;
    return this;
  }

  public setOptions(...options: ApplicationCommandOption[]) {
    this.options = options;
    return this;
  }

  public addOption(option: ApplicationCommandOption) {
    this.options = [...this.options, option];
    return this;
  }

  public setRun(run: Run) {
    this.run = run;
    return this;
  }

  public setLocales(locales: Locales) {
    this.locales = locales;
    return this;
  }

  public setGuildOnly(guildsOnly = false) {
    this.guildsOnly = guildsOnly;
  }
}
