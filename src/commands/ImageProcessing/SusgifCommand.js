const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SusgifCommand extends BaseCommand {
  constructor() {
    super('susgif', 'ImageProcessing', ["sus"]);
  }

  run(client, message, args) {
    message.channel.send('susgif command works');
  }
}