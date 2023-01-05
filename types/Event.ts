import ExtendedClient from "@core";
import { ClientEvents, Message } from "harmony";

type ArgsKeys = keyof ClientEvents;
type Args = ClientEvents[ArgsKeys];

interface Run {
  (
    client: ExtendedClient,
    ...args: Args
  ): Promise<Message | void> | Message | void;
}

export interface Event {
  name: keyof ClientEvents;
  run: Run;
}
