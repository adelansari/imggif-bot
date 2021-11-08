const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SusifierCommand extends BaseCommand {
  constructor() {
    super('susifier', 'ImageProcessing', []);
  }

  run(client, message, args) {
    message.channel.send('susifier command works');

    twerk_frame_count = 6  // 0.png to 5.png
    
    // Loading frames:


  }
}