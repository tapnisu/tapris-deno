export type LocaleNames = "en" | "ru";

// deno-lint-ignore no-explicit-any
type LocaleFunctionArgs = any[];

type LocaleFunction = (...args: LocaleFunctionArgs) => string;

export type LocaleRecords = Record<string, LocaleFunction>;

export type Locales = Record<LocaleNames, LocaleRecords>;
