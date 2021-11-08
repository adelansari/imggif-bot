// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-interactionCreate
const BaseEvent = require('../utils/structures/BaseEvent');
module.exports = class InteractionCreateEvent extends BaseEvent {
  constructor() {
    super('interactionCreate');
  }

  async run(client, interaction) {
    if (!interaction.isCommand()) return;

    if (interaction === 'profile') {
      // Create a 700x250 pixel canvas and get its context
      // The context will be used to modify the canvas
      const canvas = Canvas.createCanvas(700, 250);
      const context = canvas.getContext('2d');
      // ...
    }

  }
}
