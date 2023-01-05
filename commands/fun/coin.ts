import { Command } from "@types";
import { Embed } from "harmony";

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
  run: (client, interaction) => {
    const choice = interaction.options.find(
      (option) => option.name == "choice",
    )?.value;

    const choices = ["сoin", "tail"];
    const winner: string = choices[Math.floor(Math.random() * 2)];

    const embed = new Embed()
      .setTitle(`${winner == "coin" ? "Coin" : "Tail"} won!`)
      .setColor(client.env.BOT_COLOR)
      .setDescription(
        `${winner.toLocaleLowerCase() == choice ? "You won!" : "You lost!"}`,
      );

    return interaction.reply({ embeds: [embed] });
  },
};

export default command;
