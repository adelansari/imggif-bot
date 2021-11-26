const BaseCommand = require('../../utils/structures/BaseCommand');
const Canvas = require("canvas");
const path = require("path");
const fs = require("fs");
const probe = require("probe-image-size");

module.exports = class SusgifCommand extends BaseCommand {
  constructor() {
    super('susgif', 'ImageProcessing', ["sus"]);
  }

  run(client, message, args) {
    message.channel.send('susgif command works');

    if (message.author.bot) return false;
    if (message.attachments.size == 0) {
      return message.channel.send("No attachments in this message.");
    }

    // Saving the image sent by the user
    const attachedImage = message.attachments.first().url; 

    // Finding dimensions:
    const dimensions = await probe(attachedImage);
    const sentImgWidth = dimensions.width;
    const sentImgHeight = dimensions.height;

    // Rescaling the image based on width = 128 to create a canvas of "width x height: 128 x ?"
    const canvas_initial_width = 32;
    const canvas_initial_height = Math.round(
      (canvas_initial_width * sentImgHeight) / sentImgWidth
    );

    // Creating a canvas of 32xN from the attached image
    const canvas = Canvas.createCanvas(
      canvas_initial_width,
      canvas_initial_height
    );
    const ctx = canvas.getContext("2d");
    const background = await Canvas.loadImage(attachedImage);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height); // pixel data

    const rescaledImage = new MessageAttachment(
      canvas.toBuffer(),
      "sussified.png"
    );
    await message.channel.send("Rescaled Image:");
    await message.channel.send({ files: [rescaledImage] });

    console.log(imgData)

  }
}