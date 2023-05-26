import guildCreate from "@events/guildCreate.ts";
import guildDelete from "@events/guildDelete.ts";
import interactionCreate from "@events/interactionCreate.ts";
import ready from "@events/ready.ts";
import reconnect from "@events/reconnect.ts";
import { TaprisEvent } from "@framework/mod.ts";
import { Collection } from "harmony/mod.ts";

export const events = [
  ready,
  interactionCreate,
  guildCreate,
  guildDelete,
  reconnect,
];

/**
 * Create a collection of events
 */
export class EventsCollection extends Collection<string, TaprisEvent> {
  /**
   * Create a collection of events
   * @param events array of events to set to collection
   */
  constructor(events: TaprisEvent[]) {
    super();

    events.forEach((event) => this.set(event.name, event));
  }
}
