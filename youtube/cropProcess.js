const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
const data = require("../twitch/data.json");
const fs = require("fs");

const clipIds = fs.readFileSync("./twitch/clipIds.txt", "utf-8").split(/\r?\n/);

var reject = function (something) {
  console.error("got error", something);
};

var resolve = function () {
  console.info("Good, job done. Now read output file");
};

var onStart = function (commandLine) {
  console.log("Spawned Ffmpeg with command: " + commandLine);
};

for (let i = 0; i < data.length; i++) {
  if (data[i].id !== data[i].id.includes(clipIds)) {
    ffmpeg()
      .input(`./twitch/clips/${data[i].id}.mp4`)
      .input(`./twitch/clips/${data[i].id}.mp4`)
      .complexFilter([
        { filter: "anull", inputs: "0:a:0", outputs: "originalaudio" }
      ])
      .addOptions(
        "-filter_complex",
        "[0:v]scale=2276:1280,boxblur=4[bg];[1:v]scale=720:-1[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2[tmp];[tmp]crop=720:1280:(2276-720)/2:0[out]"
      )
      .map("[out]")
      // .map("0:a")
      .outputOptions("-map [originalaudio]")
      .output(`./twitch/clips/_${data[i].id}.mp4`)
      .on("error", reject)
      .on("end", resolve)
      .on("start", onStart)
      .run();
  } else {
    console.log("not same ID");
  }
}
