const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);


var reject = function(something) {
    console.error("got error", something);
}

var resolve = function() {
    console.info("Good, job done. Now read output file");
}

var width = 405;
var height = 720;

var filter_string = `crop=${width}:${height}`;

// filter = -filter_complex "[0:v]scale=2276:1280,boxblur=4[bg];[1:v]scale=720:-1[fg];[bg][fg];[bg][fg]overlay=(W-w)/2:(H-h)/2[tmp];[tmp]crop=720:1280:(2276-720)/2:0[out]" -map [out] -c:a copy
//filter ffprobe in.mp4 -show_entries stream=display_aspect_ratio -of compact=p=0:nk=1 -v 0

var onStart = function(commandLine) {
    console.log('Spawned Ffmpeg with command: ' + commandLine);
}

var command = ffmpeg('../twitch/clips/42062345227-offset-26768.mp4')
    .videoFilters(filter_string)
    .format('mp4')
    .on('error', reject)
    .on('end', resolve)
    .on('start', onStart)
    .output('../twitch/clips/test_cropped.mp4');

console.log("running..");
command.run();
console.log("Done");
