import { Command } from "@types";
import genshindb from "genshin-db";
import { Embed } from "harmony";

const command: Command = {
  name: "genshin",
  description: "Get info about character / weapon / artifacts set",
  options: [
    {
      name: "type",
      description: "character / weapon / artifact",
      choices: [
        { name: "character", value: "character" },
        { name: "weapon", value: "weapon" },
        { name: "artifact", value: "artifact" },
      ],
      type: 3,
      required: true,
    },
    {
      name: "name",
      description: "Name of target",
      type: 3,
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const requestType: string = interaction.options.find(
      (option) => option.name == "type",
    )?.value;

    const request: string = interaction.options.find(
      (option) => option.name == "name",
    )?.value;

    if (requestType == "character") {
      const character = genshindb.characters(
        request.replace(/ /g, "").toLocaleLowerCase(),
      );

      if (!character) {
        return await interaction.reply({
          content: `${request} is not a valid character!`,
          ephemeral: true,
        });
      }

      await interaction.defer();

      const embed = new Embed()
        .setColor(client.env.BOT_COLOR)
        .setTitle(character.name)
        .setDescription(character.description)
        .setThumbnail(character.images.icon)
        .addFields(
          {
            name: "Rarity",
            value: ":star:".repeat(Number(character.rarity)),
            inline: true,
          },
          {
            name: "Nation",
            value: character.region,
            inline: true,
          },
          {
            name: "Affiliation",
            value: character.affiliation,
            inline: true,
          },
          {
            name: "Birthday",
            value: character.birthday,
            inline: true,
          },
          {
            name: "Constellation",
            value: character.constellation,
            inline: true,
          },
          {
            name: "Element",
            value: character.element,
            inline: true,
          },
          {
            name: "Weapon type",
            value: character.weapontype,
            inline: true,
          },
          {
            name: "Sub stat",
            value: character.substat,
            inline: true,
          },
          {
            name: "Appearance",
            value: character.version,
            inline: true,
          },
        )
        .setImage(
          `https://api.genshin.dev/characters/${
            request
              .replace(/ /g, "-")
              .toLocaleLowerCase()
          }/gacha-splash.png`,
        );

      if (character.url?.fandom) embed.setURL(character.url.fandom);

      return await interaction.reply({ embeds: [embed] });
    }

    if (requestType == "weapon") {
      const weapon = genshindb.weapons(
        request.replace(/ /g, "").toLocaleLowerCase(),
      );

      if (!weapon) {
        return await interaction.reply({
          content: `${request} is not a valid weapon!`,
          ephemeral: true,
        });
      }

      await interaction.defer();

      const embed = new Embed()
        .setColor(client.env.BOT_COLOR)
        .setTitle(weapon.name)
        .setDescription(weapon.effect)
        .setThumbnail(
          `https://upload-os-bbs.mihoyo.com/game_record/genshin/equip/${weapon.images.nameicon}.png`,
        )
        .addFields(
          {
            name: "Rarity",
            value: ":star:".repeat(Number(weapon.rarity)),
            inline: true,
          },
          {
            name: weapon.effectname,
            value: weapon.effect,
            inline: true,
          },
          {
            name: "Type",
            value: weapon.weapontype,
            inline: true,
          },
          {
            name: weapon.substat,
            value: weapon.subvalue,
            inline: true,
          },
          {
            name: "Base attack",
            value: weapon.baseatk.toString(),
            inline: true,
          },
          {
            name: "Appearance",
            value: weapon.version,
            inline: true,
          },
        )
        .setImage(
          `https://res.cloudinary.com/genshin/image/upload/sprites/${weapon.images.namegacha}.png`,
        );

      if (weapon.url?.fandom) embed.setURL(weapon.url.fandom);

      return await interaction.reply({ embeds: [embed] });
    }

    if (requestType == "artifact") {
      const artifact = genshindb.artifacts(
        request.replace(/ /g, "").toLocaleLowerCase(),
      );

      if (!artifact) {
        return await interaction.reply({
          content: `${request} is not a valid artifact!`,
          ephemeral: true,
        });
      }

      await interaction.defer();

      const embed = new Embed()
        .setColor(client.env.BOT_COLOR)
        .setTitle(artifact.name)
        .setDescription(
          artifact.flower
            ? artifact.flower.description
            : artifact.circlet.description,
        )
        .setThumbnail(
          artifact.images?.flower
            ? artifact.images.flower
            : artifact.images.circlet,
        )
        .addFields(
          {
            name: "Rarity",
            value: ":star:".repeat(Number(artifact.rarity)),
            inline: true,
          },
          {
            name: "2 piece bonus",
            value: artifact["2pc"] ? artifact["2pc"] : "None",
            inline: true,
          },
          {
            name: "4 piece bonus",
            value: artifact["4pc"] ? artifact["4pc"] : "None",
            inline: true,
          },
        );

      if (artifact.url?.fandom) embed.setURL(artifact.url.fandom);

      return await interaction.reply({ embeds: [embed] });
    }
  },
};

export default command;
