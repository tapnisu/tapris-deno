import TaprisClient from "@core/mod.ts";

if (import.meta.main) await new TaprisClient().init();

export * from "@framework/mod.ts";
export * from "@typings/mod.ts";
export * from "@utils/mod.ts";
export { TaprisClient };
