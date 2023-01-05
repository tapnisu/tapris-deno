import { Command } from "@types";
import { ActionRowComponent, Embed } from "harmony";

const command: Command = {
  name: "lmgtfy",
  description: "'Let Me Google That For You' links generator",
  options: [
    {
      name: "query",
      description: "Query, to generate link",
      type: 3,
      required: true,
    },
  ],
  run: (client, interaction) => {
    const query = interaction.options.find(
      (option) => option.name == "query",
    )?.value;

    const link = `https://lmgtfy.app/?q=${encodeURI(query.replace(/ /g, "+"))}`;

    const embed = new Embed()
      .setColor(client.env.BOT_COLOR)
      .setTitle(link)
      .setURL(link);

    const buttonsRow: ActionRowComponent = {
      type: 1,
      components: [
        {
          type: 2,
          url: link,
          label: `Get answer for '${query}'`,
          style: 5,
        },
      ],
    };

    return interaction.reply({ embeds: [embed], components: [buttonsRow] });
  },
};

export default command;
