var readline = require("linebyline");
var fs = require("fs");

const clipIds = fs.readFileSync("./twitch/clipIds.txt", "utf-8").split(/\r?\n/);

rl = readline("./twitch/clipIds.txt");
rl.on("line", function (line, lineCount, byteCount) {
  for (let i = 0; i < clipIds.length; i++) {
    if (line == clipIds[i]) {
      console.log("yes: ");
      console.log(line);
      console.log(clipIds[i]);
    } else {
      console.log("no: ");
      console.log(line);
      console.log(clipIds[i]);
    }
  }
}).on("error", function (e) {
  console.log(e);
});
