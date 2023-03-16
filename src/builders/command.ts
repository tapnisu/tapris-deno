import ExtendedClient from "@core";
import { LocaleNames, LocaleRecords, Locales } from "@typings/mod.ts";
import {
  ApplicationCommandInteraction,
  ApplicationCommandOption,
  SlashCommandInteraction
} from "harmony/mod.ts";

export class CommandBuilder<T extends LocaleRecords> {
  name = "";
  description = "";
  options: ApplicationCommandOption[] = [];
  guildsOnly = false;

  run!: (
    client: ExtendedClient,
    interaction: SlashCommandInteraction,
    locale: T,
  ) => Promise<ApplicationCommandInteraction>;
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

  public setRun(run: typeof this.run) {
    this.run = run;
    return this;
  }

  public setLocales(locales: Record<LocaleNames, T>) {
    this.locales = locales;
    return this;
  }

  public setGuildOnly(guildsOnly = false) {
    this.guildsOnly = guildsOnly;
  }
}
