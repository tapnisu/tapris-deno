import { TaprisClient } from "@core/mod.ts";
import {
  ApplicationCommandInteraction,
  ClientEvents,
  Interaction,
  Message,
} from "harmony/mod.ts";

export type EventName = keyof ClientEvents;
export type EventArgs<T extends EventName> = ClientEvents[T];

export type EventRun<T extends EventName> = (
  client: TaprisClient,
  ...args: EventArgs<T>
) =>
  | Promise<
      ApplicationCommandInteraction | Interaction | Message | undefined | void
    >
  | Message
  | undefined
  | void;

export class TaprisEvent<T extends EventName = "raw"> {
  name!: T;
  run: EventRun<T> = () => {};

  public setName(name: T) {
    this.name = name;

    return this;
  }

  public setRun(run: EventRun<T>) {
    this.run = run;

    return this;
  }
}
