const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SusifierCommand extends BaseCommand {
  constructor() {
    super('susifier', 'ImageProcessing', []);
  }

  run(client, message, args) {
    message.channel.send('susifier command works');
  }
}