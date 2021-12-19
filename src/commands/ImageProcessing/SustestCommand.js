const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SustestCommand extends BaseCommand {
  constructor() {
    super('sustest', 'ImageProcessing', []);
  }

  async run(client, message, args) {
    if (message.author.bot) return false;
    if (message.attachments.size == 0) {
      return message.channel.send("No attachments in this message.");
    }
    message.channel.send('sustest command works');
    
  }
}