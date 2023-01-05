import { Command, SearchResult } from "@types";
import { ActionRowComponent, Embed } from "harmony";

const command: Command = {
  name: "manga",
  description: "Get data about manga",
  options: [
    {
      name: "query",
      description: "Query for search",
      type: 3,
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const query = interaction.options.find(
      (option) => option.name == "query",
    )?.value;

    const response: SearchResult[] = await (
      await fetch(`https://manga.deno.dev/api/search?q=${encodeURI(query)}`)
    ).json();

    if (response.length == 0) {
      return interaction.reply({
        content: "Sorry! Manga not found! :(",
        ephemeral: true,
      });
    }

    const embed = new Embed()
      .setColor(client.env.BOT_COLOR)
      .setTitle(response[0].name)
      .addFields({
        name: "Last chapter",
        value: response[0].lastChapter,
        inline: true,
      })
      .setImage(response[0].thumbnail)
      .setURL(response[0].url)
      .setAuthor({ name: response[0].author });

    const buttonsRow: ActionRowComponent = {
      type: 1,
      components: [
        {
          type: 2,
          url: response[0].url,
          label: "Read manga",
          style: 5,
        },
      ],
    };

    return interaction.reply({ embeds: [embed], components: [buttonsRow] });
  },
};

export default command;
