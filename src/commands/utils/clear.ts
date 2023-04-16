import { LocaleRecords, TaprisCommand } from "@framework/mod.ts";
import { ApplicationCommandOptionType, GuildTextChannel } from "harmony/mod.ts";

interface ClearLocale extends LocaleRecords {
  noPermission: () => string;
  bigRequest: () => string;
  smallNumber: () => string;
  oldMessages: () => string;
  deletedNMessages: (n: number) => string;
}

export default new TaprisCommand<ClearLocale>()
  .setName("clear")
  .setDescription("Clear messages in chat")
  .setOptions({
    name: "amount",
    description: "Amount of messages to be deleted",
    type: ApplicationCommandOptionType.NUMBER,
    required: true,
  })
  .setLocales({
    en: {
      noPermission: () => "You don't have a permission to delete messages!",
      bigRequest: () => "I can't delete more than 100 posts at a time!",
      smallNumber: () => "You need to enter a number greater than 1!",
      oldMessages: () => "I can't delete messages older than 14 days!",
      deletedNMessages: (n: number) => `Deleted ${n} messages!`,
    },
    ru: {
      noPermission: () => "У тебя нет прав на удаление сообщений!",
      bigRequest: () => "Я не могу удалять более 100 сообщений за раз!",
      smallNumber: () => "Тебе нужно ввести число больше чем 1!",
      oldMessages: () => "Я не могу удалять сообщения старше 14 дней!",
      deletedNMessages: (n: number) => `Удалено ${n} сообщений!`,
    },
  })
  .setGuildOnly()
  .setRun(async (_client, interaction, locale) => {
    const amount: number = interaction.options.find(
      (option) => option.name === "amount"
    )?.value;

    const channel = interaction.channel as GuildTextChannel;

    if (!interaction.member?.permissions.has("ManageMessages")) {
      return await interaction.reply({
        content: locale.noPermission(),
        ephemeral: true,
      });
    }
    if (amount > 100) {
      return await interaction.reply({
        content: locale.bigRequest(),
        ephemeral: true,
      });
    }
    if (amount < 1) {
      return await interaction.reply({
        content: locale.smallNumber(),
        ephemeral: true,
      });
    }

    channel
      .bulkDelete(amount)
      .catch(
        async () =>
          await interaction.reply({
            content: locale.oldMessages(),
            ephemeral: true,
          })
      )
      .then(
        async () =>
          await interaction.reply({
            content: locale.deletedNMessages(amount),
            ephemeral: true,
          })
      );
  });


