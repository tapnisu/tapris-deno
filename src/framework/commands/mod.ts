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
    locale: T,
) => Promise<ApplicationCommandInteraction | undefined>;

/**
 * Locale-aware command builder used in Tapris
 */
export class TaprisCommand<T = undefined> {
    name!: string;
    description!: string;
    options: ApplicationCommandOption[] = [];
    guildOnly = false;
    locales: Record<LocaleNames, T> | undefined;
    memberPermissions!: PermissionResolvable;
    run!: CommandRun<T>;

    /**
     * Set name for command
     * @param name name of new command
     * @returns this
     */
    public setName(name: string): TaprisCommand<T> {
        this.name = name;

        return this;
    }

    /**
     * Set description for command
     * @param description description of new command
     * @returns this
     */
    public setDescription(description: string): TaprisCommand<T> {
        this.description = description;

        return this;
    }

    /**
     * Set command options for command
     * @param options Array of options to set
     * @returns this
     */
    public setOptions(
        ...options: ApplicationCommandOption[]
    ): TaprisCommand<T> {
        this.options = options;

        return this;
    }

    /**
     * Add command option for command
     * @param option Option to add
     * @returns this
     */
    public addOption(option: ApplicationCommandOption): TaprisCommand<T> {
        this.options = [...this.options, option];

        return this;
    }

    /**
     * Set run function
     * @param run Function to be run
     * @returns this
     */
    public setRun(run: typeof this.run) {
        this.run = run;

        return this;
    }

    /**
     * Set locales for function
     * @param locales Locales for command
     * @returns this
     */
    public setLocales(locales: Record<LocaleNames, T>): TaprisCommand<T> {
        this.locales = locales;

        return this;
    }

    /**
     * Set command to be guild only
     * @param guildOnly true by default
     * @returns this
     */
    public setGuildOnly(guildOnly = true): TaprisCommand<T> {
        this.guildOnly = guildOnly;

        return this;
    }

    /**
     * Set required permissions to run command
     * @param memberPermissions Required permissions to run command
     * @returns this
     */
    public setMemberPermissions(
        memberPermissions: PermissionResolvable,
    ): TaprisCommand<T> {
        this.memberPermissions = memberPermissions;

        return this;
    }

    /**
     * Get json for command (to register or send as json)
     * @returns Command as json
     */
    public json() {
        // deno-lint-ignore no-unused-vars
        const { memberPermissions, locales, ...commandJson } = this;

        return commandJson;
    }
}
