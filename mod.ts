import { commands } from "@commands/mod.ts";
import { components } from "@components/mod.ts";
import { events } from "@events/mod.ts";
import { env, TaprisClient, TaprisCommand, TaprisEvent } from "./src/mod.ts";

Deno.cron("ping", "* * * * *", () => {
  console.log("Ping!!!");
});

if (import.meta.main) {
  await new TaprisClient(
    env,
    commands as TaprisCommand[],
    events as TaprisEvent[],
    components,
  ).start();
}

export * from "./src/mod.ts";
