const BaseCommand = require("../../utils/structures/BaseCommand");
const { Client, Message, MessageAttachment } = require("discord.js");
const Canvas = require("canvas");
const path = require("path");
const fs = require("fs");
// const { readFileSync } = require("fs");
const probe = require("probe-image-size");
const CanvasGifEncoder = require("canvas-gif-encoder");

module.exports = class SusifierCommand extends BaseCommand {
  constructor() {
    super("susifier", "ImageProcessing", ["sus"]);
  }

  async run(client, message, args) {
    if (message.author.bot) return false;
    if (message.attachments.size == 0) {
      return message.channel.send("No attachments in this message.");
    }

    const attachedImage = message.attachments.first().url; // Saving the image sent by the user

    // Finding dimensions:
    const dimensions = await probe(attachedImage);
    const sentImgWidth = dimensions.width;
    const sentImgHeight = dimensions.height;

    // Rescaling the image based on width = 128 to create a canvas of "width x height: 128 x ?"
    const canvas_initial_width = 32;
    const canvas_initial_height = Math.round(
      (canvas_initial_width * sentImgHeight) / sentImgWidth
    );

    // message.channel.send(attachedImage);

    // Creating a canvas of 32xsomething from the attached image
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

    // Getting the color value per pixel
    const xCoord = 0;
    const yCoord = 0;
    const data = ctx.getImageData(xCoord, yCoord, 1, 1).data;

    // Pixelating the image:

    // invert colors
    const invertImageData = imgData;
    for (var i = 0; i < invertImageData.data.length; i += 4) {
      invertImageData.data[i] = 255 - invertImageData.data[i]; // RED
      invertImageData.data[i + 1] = 255 - invertImageData.data[i + 1]; // GREEN
      invertImageData.data[i + 2] = 255 - invertImageData.data[i + 2]; // BLUE
      invertImageData.data[i + 3] = 255; // ALPHA
    }

    const invertCtx = canvas.getContext("2d");
    invertCtx.putImageData(invertImageData, 0, 0);
    const invertedImage = new MessageAttachment(
      canvas.toBuffer(),
      "inverted.png"
    );
    await message.channel.send("Inverted Image:");
    await message.channel.send({ files: [invertedImage] });

    // 32 is the height of the rescaled image:
    // formula to find the color value of a given pixel in the array: x+y*width*4
    const imageDetailedData = [];
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const index = (x + y * canvas.width) * 4;
      }
    }

    // sample gif link - https://media.tenor.com/images/b01bcfdc8fee4ffecd13182d575ccba6/tenor.gif

    // twerk image:
    // const twerk_frame_count = 6; // 0.png to 5.png
    const twerk_file_path = "/twerk_imgs/";
    const susImageDir = path.join(__dirname, `.${twerk_file_path}`);
    const twerkSusImg = fs.readFileSync(`${susImageDir}0.png`);
    // const twerkSusImg = fs.readFileSync(`${susImageDir}/sus.gif`);
    const twrkImgData = probe.sync(twerkSusImg);

    // gif dimention:
    const twerk_width = twrkImgData.width;
    const twerk_height = twrkImgData.height;

    const twerk_canvas_w = canvas_initial_width * twerk_width;
    const twerk_canvas_h = canvas_initial_height * twerk_height;

    // const twerk_gif = new MessageAttachment(
    //   "./src/commands/ImageProcessing/twerk_imgs/sus.gif"
    // );
    // await message.channel.send({ files: [twerk_gif] });

    const susCanvas = Canvas.createCanvas(twerk_canvas_w, twerk_canvas_h);

    const ctxTwerk = susCanvas.getContext("2d");
    const encoder = new CanvasGifEncoder(twerk_width, twerk_height);
    let stream = fs.createWriteStream("output.gif");
    encoder.createReadStream().pipe(stream);
    encoder.begin();
    ctxTwerk.fillRect(0, 0, twerk_canvas_w, twerk_canvas_h);
    // const susbackground = await Canvas.loadImage(`${susImageDir}sus.gif`);
    // console.log(susbackground);

    // ctxTwerk.drawImage(susbackground, 0, 0, twerk_width, twerk_height);

    const twerk_img = [];
    for (let i = 0; i < 5; ++i) {
      twerk_img[i] = path.join(__dirname, `.${twerk_file_path}` + i + ".png"); // storing all twerk frames
    }
    console.log(twerk_img)

    for (let i = 0; i < twerk_img.length; ++i) {
      ctxTwerk.drawImage(twerk_img[i], 0, 0, twerk_width, twerk_height);
      encoder.addFrame(ctxTwerk, 250);
    }
    encoder.end();

    const twerk_png = new MessageAttachment(susCanvas.toBuffer(), "sus.gif");

    await message.channel.send({ files: [twerk_png] });








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
