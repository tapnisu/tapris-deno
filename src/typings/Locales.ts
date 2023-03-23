export type LocaleNames = "en" | "ru";

type LocaleFunction = (...args: unknown[]) => string;

export type LocaleRecords = Record<string, LocaleFunction>;

export type Locales = Record<LocaleNames, LocaleRecords>;
