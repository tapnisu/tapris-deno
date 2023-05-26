import { TaprisClient } from "./src/mod.ts";

if (import.meta.main) await new TaprisClient().start();

export * from "./src/mod.ts";
