import ExtendedClient from "@core";
import guildCreate from "@events/guildCreate.ts";
import guildDelete from "@events/guildDelete.ts";
import interactionCreate from "@events/interactionCreate.ts";
import ready from "@events/ready.ts";
import reconnect from "@events/reconnect.ts";

const events = [
  ready,
  interactionCreate,
  guildCreate,
  guildDelete,
  reconnect,
];

export default (client: ExtendedClient) =>
  events.forEach((event) => {
    client.events.set(event.name, event);
    client.on(event.name, event.run.bind(null, client));
  });
