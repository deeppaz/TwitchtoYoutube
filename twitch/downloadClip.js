const axios = require("axios");
const fs = require("fs");

const clipIds = fs.readFileSync("./twitch/clips.txt").toString().split("\n");
