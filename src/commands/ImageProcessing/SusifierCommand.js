const BaseCommand = require("../../utils/structures/BaseCommand");
const { Client, Message, MessageAttachment } = require("discord.js");
const Canvas = require("canvas");
const path = require("path");
const fs = require("fs");

module.exports = class SusifierCommand extends BaseCommand {
  constructor() {
    super("susifier", "ImageProcessing", ["sus"]);
  }

  async run(client, message, args) {
    if (message.author.bot) return false;
    if (message.attachments.size == 0) {
      return message.channel.send("No attachments in this message.");
    }

    const attachedImage = message.attachments.first().url; // saving the image sent by the user

    // message.channel.send(attachedImage);

    // Creating a canvas of 64x64 from the attached image
    const canvas = Canvas.createCanvas(128, 128);
    const ctx = canvas.getContext("2d");
    const background = await Canvas.loadImage(attachedImage);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const attachment = new MessageAttachment(
      canvas.toBuffer(),
      "sussified.png"
    );
    message.channel.send({ files: [attachment] });

    // Getting the color value per pixel
    const data = ctx.getImageData(X, Y, 1, 1).data;

    // invert colors
    for (var i = 0; i < imgData.data.length; i += 4) {
      imgData.data[i] = 255 - imgData.data[i];  // RED
      imgData.data[i + 1] = 255 - imgData.data[i + 1];  // GREEN
      imgData.data[i + 2] = 255 - imgData.data[i + 2];  // BLUE
      imgData.data[i + 3] = 255;  // ALPHA
    }

    ctx.putImageData(imgData, 0, 0);

    // 128 is the height of the rescaled image:
    // formula to find the color value of a given pixel in the array: x+y*width*4
    const imageDetailedData = []
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const index = ( x + y * width ) * 4;
      }
    }

    


    message.channel.send({ files: [attachment] });


    const twerk_frame_count = 6; // 0.png to 5.png
    const twerk_file_path = "/twerk_imgs/";
    // const imageDir = path.join(__dirname, `.${twerk_file_path}`);
    // const twerk_img = fs.readdirSync(imageDir);

    /* 
    // Stuff I wrote that doesn't work as intended:
    //

    // Changing image color:
    function draw() {
      // draw image
      ctx.drawImage(this, 0, 0);
      // set composite mode
      ctx.globalCompositeOperation = "source-in";
      // draw color
      ctx.fillStyle = "#09f";
      ctx.fillRect(0, 0, c.width, c.height);
    }

    const twerk_img = []
    const ohno = []
    for (let i = 0; i < twerk_frame_count; i++) {
      try {
        twerk_img[i] = path.join(__dirname,`.${twerk_file_path}`+i+".png"); // storing all twerk frames
        ohno[i] = draw(Canvas.loadImage(twerk_img[i]))
      }
      catch(err) {
        console.log("Error loading twerk frames.")
      }
    }
    console.log(twerk_img[1])
    message.channel.send("Message", {files: [`${twerk_img[1]}`]});
    message.channel.send("Message", {files: [`${ohno[1]}`]});

    //
    //
    */
  }
};
