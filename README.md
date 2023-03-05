<p align="center">
 <img width=400px src="assets/avatar.webp" alt="Bot logo">
 <h1 align="center">Tapris</h1>
 <h3 align="center">Multipurpose discord bot</h3>
</p>

<p align="center">
 <a href="#overview">Overview</a>,
 <a href="#invite">Invite</a>,
 <a href="#host">Host</a>
</p>

## Overview

Tapris is a discord bot, made in TypeScript and Deno (using [harmony](https://github.com/harmonyland/harmony) as a library).

Project is named after Tapris
Sugarbell Chisaki from Gabriel DropOut manga.

## Invite

You can invite the bot by
[this link](https://discord.com/api/oauth2/authorize?client_id=869088074758520832&scope=bot+applications.commands&permissions=294208515334).
Type "/" to see commands!

## Host

1. Create bot -
   [Discord developer portal](https://discord.com/developers/applications)

2. Install [Deno](https://deno.land/manual@v1.29.2/getting_started/installation)

3. Clone repo:
   `git clone https://github.com/tapris-bot/tapris.git && cd ./tapris/`

4. Setup [.env](.env.sample) / your env variables (example in
   [.env.sample](.env.sample))

Or, if you are using just env, set MODE to `DENODEPLOY`

5. Run `deno task start`

Now you have a running bot!
