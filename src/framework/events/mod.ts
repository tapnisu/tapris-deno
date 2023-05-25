import { TaprisClient } from "@core/mod.ts";
import {
  ApplicationCommandInteraction,
  ClientEvents,
  Interaction,
  Message,
} from "harmony/mod.ts";

export type EventName = keyof ClientEvents;

export type EventRun = (
  client: TaprisClient,
  // deno-lint-ignore no-explicit-any
  ...args: any[]
) =>
  | Promise<
      ApplicationCommandInteraction | Interaction | Message | undefined | void
    >
  | Message
  | undefined
  | void;

export class TaprisEvent {
  name: EventName = "raw";
  run: EventRun = () => {};

  public setName(name: EventName) {
    this.name = name;

    return this;
  }

  public setRun(run: EventRun) {
    this.run = run;

    return this;
  }
}
