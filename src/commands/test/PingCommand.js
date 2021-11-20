const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class PingCommand extends BaseCommand {
  constructor() {
    super('ping', 'test', []);
  }

  run(client, message, args) {
    message.channel.send(`${client.ws.ping} pong!`);
  }
}