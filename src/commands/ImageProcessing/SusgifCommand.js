const BaseCommand = require("../../utils/structures/BaseCommand");
const { Client, Message, MessageAttachment } = require("discord.js");
const Canvas = require("canvas");
const path = require("path");
const fs = require("fs");
const probe = require("probe-image-size");

module.exports = class SusgifCommand extends BaseCommand {
  constructor() {
    super("susgif", "ImageProcessing", ["sus"]);
  }

  async run(client, message, args) {
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

    // Rescaling the image based on width = 32 to create a canvas of "width x height: 32 x N"
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


    // Creating a canvas for twerk images
    const twerk_file_path = "/twerk_imgs/";
    const susImageDir = path.join(__dirname, `.${twerk_file_path}0.png`);
    const twerkSusImg = fs.readFileSync(`${susImageDir}`);
    const twrkImgData = probe.sync(twerkSusImg);
    // gif dimention:
    const twerk_width = twrkImgData.width;
    const twerk_height = twrkImgData.height;
 

    const canvasTwerk = Canvas.createCanvas(
      twerk_width,
      twerk_height
    );
    const ctxTwerk = canvasTwerk.getContext("2d");
    const backgroundTwerk = await Canvas.loadImage(`${susImageDir}`);
    ctxTwerk.drawImage(backgroundTwerk, 0, 0, canvasTwerk.width, canvasTwerk.height);
    const imgDataTwerk = ctxTwerk.getImageData(0, 0, canvasTwerk.width, canvasTwerk.height); // pixel data

    const twImData = imgDataTwerk;  // twerk image data
    for (var i = 0; i < twImData.data.length; i += 4) {
      if (twImData.data[i]==214 && twImData.data[i+1]==224 && twImData.data[i+2]==240) {
        twImData.data[i] = 255 ; // RED
        twImData.data[i + 1] = 154 ; // GREEN
        twImData.data[i + 2] = 118 ; // BLUE
        twImData.data[i + 3] = 255; // ALPHA
      }
    }
    
    const twerkImage = new MessageAttachment(
      canvasTwerk.toBuffer(),
      "twerk.png"
    );
    await message.channel.send("Twerk Image:");
    await message.channel.send({ files: [twerkImage] });

    const recoloredSUS = canvasTwerk.getContext("2d");
    recoloredSUS.putImageData(twImData, 0, 0);
    const recolredSusImage = new MessageAttachment(
      canvasTwerk.toBuffer(),
      "recoloredSUS.png"
    );
    await message.channel.send("Recolored SUS Image:");
    await message.channel.send({ files: [recolredSusImage] });
  }
};
