const BaseCommand = require('../../utils/structures/BaseCommand');
// const { Client, Message, MessageAttachment} = require("discord.js")

module.exports = class SusifierCommand extends BaseCommand {
  constructor() {
    super('susifier', 'ImageProcessing', []);
  }

  async run (client, message, args) {
    message.channel.send('susifier command works');

    const twerk_frame_count = 6;  // 0.png to 5.png

    const messageAttachment = message.attachments.size > 0 ? message.attachments.array()[0].url : null;
    // Exit if there is no message attachment present in the message
    if (!messageAttachment) return;


    // Loading frames:


  }
}