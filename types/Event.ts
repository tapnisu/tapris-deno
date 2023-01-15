import ExtendedClient from "@core";
import { ClientEvents, Message } from "harmony";

type EventName = keyof ClientEvents;
type Args = ClientEvents[EventName];

interface Run {
  (
    client: ExtendedClient,
    ...args: any
    //...args: Args
  ): Promise<Message | undefined | void> | Message | undefined | void;
}

export interface Event {
  name: EventName;
  run: Run;
}
