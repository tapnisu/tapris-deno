import { LocaleNames } from "@framework/mod.ts";

class Guild {
  public language: LocaleNames = "en";
}

export class TaprisDBManager {
  kv!: Deno.Kv;

  public async connect(): Promise<TaprisDBManager> {
    this.kv = await Deno.openKv();
    return this;
  }

  public async getGuild(id: string): Promise<Guild | null> {
    return (await this.kv.get<Guild>(["guilds", id])).value;
  }

  public async getGuildLanguage(id?: string): Promise<LocaleNames> {
    if (!id) return "en";

    const localeName = (
      await this.kv.get<LocaleNames>(["guilds", id, "language"])
    ).value;

    return localeName ? localeName : "en";
  }

  public async selectLocale<T = unknown>(
    locale: Record<LocaleNames, T> | undefined,
    id?: string
  ): Promise<T> {
    if (!locale) return undefined as T;
    return locale[await this.getGuildLanguage(id)];
  }

  public async setGuildLanguage(
    id: string,
    language: LocaleNames
  ): Promise<LocaleNames> {
    await this.kv.set(["guilds", id, "language"], language);
    return language;
  }

  public async registerGuild(id: string) {
    await this.kv.set(["guilds", id], new Guild());
  }

  public async removeGuild(id: string) {
    await this.kv.delete(["guilds", id]);
  }
}

export default TaprisDBManager;
