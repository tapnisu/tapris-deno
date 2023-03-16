export type LocaleNames = "en" | "ru";

// deno-lint-ignore no-explicit-any
type LocaleFunction = (...args: any[]) => string;

export type LocaleRecords = Record<string, LocaleFunction>;

export type Locales = Record<LocaleNames, LocaleRecords>;
