import { TaprisClient } from "@core/mod.ts";
import {
  ApplicationCommandInteraction,
  ApplicationCommandOption,
  PermissionResolvable,
  SlashCommandInteraction,
} from "harmony/mod.ts";

export type LocaleNames = "en" | "ru";

export type CommandRun<T> = (
  client: TaprisClient,
  interaction: SlashCommandInteraction,
  locale: T
) => Promise<ApplicationCommandInteraction | undefined>;

export class TaprisCommand<T = undefined> {
  name = "";
  description = "";
  options: ApplicationCommandOption[] = [];
  guildOnly = false;
  locales: Record<LocaleNames, T> | undefined;
  memberPermissions!: PermissionResolvable;

  run!: CommandRun<T>;

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

  public setGuildOnly(guildOnly = true) {
    this.guildOnly = guildOnly;

    return this;
  }

  public setMemberPermissions(memberPermissions: PermissionResolvable) {
    this.memberPermissions = memberPermissions;

    return this;
  }

  /**
   * Get json for command (to register or send as json)
   */
  public json() {
    // deno-lint-ignore no-unused-vars
    const { memberPermissions, locales, ...commandJson } = this;

    return commandJson;
  }
}
