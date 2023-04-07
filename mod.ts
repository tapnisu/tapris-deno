import { TaprisClient } from "./src/mod.ts";

if (import.meta.main) await new TaprisClient().init();

export * from "./src/mod.ts";
