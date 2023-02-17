import ExtendedClient from "@core";
import {
  ApplicationCommandInteraction,
  ClientEvents,
  Interaction,
  Message,
} from "harmony/mod.ts";

type EventName = keyof ClientEvents;
type Args = ClientEvents[EventName];

interface Run {
  (
    client: ExtendedClient,
    // TODO: remove any here by fixing Args type
    // deno-lint-ignore no-explicit-any
    ...args: any[]
  ): //...args: Args
  | Promise<
    ApplicationCommandInteraction | Interaction | Message | undefined | void
  >
  | Message
  | undefined
  | void;
}

export interface Event {
  name: EventName;
  run: Run;
}
