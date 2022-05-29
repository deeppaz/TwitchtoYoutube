const data = require("../data.json");
const fs = require("fs");


const clipIds = fs
.readFileSync("./twitch/clipIds.txt", "utf-8")
.split(/\r?\n/);

for (let i = 0; i < data.length; i++) {
  if (data[i].id == data[i].id.includes(clipIds)) {
    console.log("yes")
  } else {
    console.log("no")
  }
}