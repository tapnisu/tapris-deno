import { TaprisClient } from "@core/mod.ts";
import { Interaction, MessageComponentInteraction } from "harmony/mod.ts";

export type ComponentRun = (
    client: TaprisClient,
    interaction: MessageComponentInteraction,
) => Promise<Interaction | void> | void;

/**
 * Component builder used in Tapris
 */
export class TaprisComponent {
    customId!: RegExp;
    run!: ComponentRun;

    /**
     * Set id for component
     * @param customId Id for component
     * @returns this
     */
    public setCustomId(customId: RegExp) {
        this.customId = customId;

        return this;
    }

    /**
     * Set run function
     * @param run Function to be run
     * @returns this
     */
    public setRun(run: ComponentRun) {
        this.run = run;

        return this;
    }
}
