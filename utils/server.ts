import { Command } from "@typings/mod.ts";
import { Collection } from "harmony/mod.ts";
import { Hono } from "hono/mod.ts";

class Server extends Hono {
  private commands: Collection<string, Command>;

  constructor(commands: Collection<string, Command>) {
    super();

    this.commands = commands;

    this.get("/", (r) => r.redirect("https://tapris.tapni.su", 302));

    this.get(
      "/git",
      (r) => r.redirect("https://github.com/tapris-bot/tapris", 302),
    );

    this.get(
      "/github",
      (r) => r.redirect("https://github.com/tapris-bot/tapris", 302),
    );

    this.get("/invite", (r) =>
      r.redirect(
        "https://discord.com/api/oauth2/authorize?client_id=869088074758520832&scope=bot+applications.commands&permissions=294208515334",
        302,
      ));

    this.get("/api", (r) => r.redirect("/api/v1", 302));

    this.get("/api/v1", (r) =>
      r.json({
        routes: ["commands"],
      }));

    this.get("/api/v1/commands", (r) => r.json(this.commands.array()));

    this.get("/api/v1/commands/:name", (r) => {
      const command = this.commands.get(r.req.param("name"));

      if (command) return r.json(command);

      return r.json({
        error: "Command not found!",
      });
    });
  }
}

export default Server;
