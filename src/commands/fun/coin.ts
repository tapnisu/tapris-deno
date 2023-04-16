import { LocaleRecords, TaprisCommand } from "@framework/mod.ts";
import { ApplicationCommandOptionType, Embed } from "harmony/mod.ts";

type Choice = "coin" | "tail";
const choices: Choice[] = ["coin", "tail"];

interface coinLocale extends LocaleRecords {
  winner: (choice: Choice) => string;
  youWonLost: (winOrNot: boolean) => string;
}

export default new TaprisCommand<coinLocale>()
  .setName("coin")
  .setDescription("Flip a coin")
  .setOptions({
    name: "choice",
    description: "Your selection",
    choices: [
      { name: "Coin", value: "coin" },
      { name: "Tail", value: "tail" },
    ],
    type: ApplicationCommandOptionType.STRING,
    required: true,
  })
  .setLocales({
    en: {
      winner: (choice: Choice) =>
        `Got ${choice === choices[0] ? "coin" : "tail"}`,
      youWonLost: (winOrNot: boolean) =>
        winOrNot ? "You won!" : "You lost! :(",
    },
    ru: {
      winner: (choice: Choice) =>
        choice === choices[0] ? "Выпал орёл" : "Выпала решка",
      youWonLost: (winOrNot: boolean) =>
        winOrNot ? "Вы выиграли! :D" : "Вы проиграли! :(",
    },
  })
  .setRun((client, interaction, locale) => {
    const choice = interaction.options.find(
      (option) => option.name === "choice"
    )?.value;

    const winner: Choice = choices[Math.floor(Math.random() * 2)];

    const embed = new Embed()
      .setTitle(locale.winner(winner))
      .setColor(client.botColor)
      .setDescription(locale.youWonLost(winner === choice));

    return interaction.reply({ embeds: [embed] });
  });


