import { Command } from "@types";
import { Embed } from "harmony";

type Choice = "coin" | "tail";
const choices: Choice[] = ["coin", "tail"];

const commandLocales = {
  en: {
    winner: (choice: Choice) => `Got ${choice == choices[0] ? "coin" : "tail"}`,
    youWonLost: (winOrNot: boolean) => (winOrNot ? "You won!" : "You lost! :("),
  },
  ru: {
    winner: (choice: Choice) =>
      choice == choices[0] ? "Выпал орёл" : "Выпала решка",
    youWonLost: (winOrNot: boolean) =>
      winOrNot ? "Вы выиграли! :D" : "Вы проиграли! :(",
  },
};

const command: Command = {
  name: "coin",
  description: "Flip a coin",
  options: [
    {
      name: "choice",
      description: "Your selection",
      choices: [
        { name: "Coin", value: "coin" },
        { name: "Tail", value: "tail" },
      ],
      type: 3,
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const choice = interaction.options.find(
      (option) => option.name == "choice"
    )?.value;

    const locales = (await client.db.selectLocale(
      interaction.guild!.id,
      commandLocales
    )) as typeof commandLocales.en;

    const winner: Choice = choices[Math.floor(Math.random() * 2)];

    const embed = new Embed()
      .setTitle(locales.winner(winner))
      .setColor(client.env.BOT_COLOR)
      .setDescription(locales.youWonLost(winner == choice));

    return interaction.reply({ embeds: [embed] });
  },
};

export default command;
