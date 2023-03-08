import ExtendedClient from "@core";
import {
  ApplicationCommandInteraction,
  ClientEvents,
  Interaction,
  Message
} from "harmony/mod.ts";

type EventName = keyof ClientEvents;
type Args = ClientEvents[EventName];

interface Run {
  (
    client: ExtendedClient,
    // deno-lint-ignore no-explicit-any
    ...args: any[]
    // ...args: Args
  ):
    | Promise<
      ApplicationCommandInteraction | Interaction | Message | undefined | void
    >
    | Message
    | undefined
    | void;
}

class Event {
  public name: EventName = "raw";
  public run: Run = () => {};

  public setName(name: EventName) {
    this.name = name;
  }

  public setRun(run: Run) {
    this.run = run;
  }
}

export default Event;
