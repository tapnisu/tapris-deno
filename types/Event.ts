import ExtendedClient from "@core";
import { ClientEvents } from "harmony";

type ArgsKeys = keyof ClientEvents;
type Args = ClientEvents[ArgsKeys];

interface Run {
	(client: ExtendedClient, ...args: Args): any;
}

export interface Event {
	name: keyof ClientEvents;
	run: Run;
}
