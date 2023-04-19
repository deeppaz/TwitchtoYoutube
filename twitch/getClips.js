const fs = require("fs");
const moment = require("moment");
const TwitchApi = require("node-twitch").default;
require("dotenv").config();

const twitch = new TwitchApi({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET
});

async function getClip() {
  // 24hours
  // var startedAt = moment().startOf('day').format('YYYY-MM-DDTHH:mm:ss[Z]')
  // var endedAt = moment().endOf('day').format('YYYY-MM-DDTHH:mm:ss[Z]')
  // 1weeks
  var startedAt = moment()
    .subtract(1, "weeks")
    .startOf("week")
    .format("YYYY-MM-DDTHH:mm:ss[Z]");
  var endedAt = moment()
    .subtract(0, "days")
    .endOf("day")
    .format("YYYY-MM-DDTHH:mm:ss[Z]");
  console.log(startedAt);
  console.log(endedAt);
  const clips = await twitch.getClips({
    game_id: "511224",
    started_at: startedAt,
    ended_at: endedAt,
    first: 100
  });
  let data = Object.values(clips.data)
  console.log(data)
  const result = data.filter(c => c.language == "en");

  fs.writeFile(
    "./data.json",
    JSON.stringify(result, null, 3),
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("success");
      }
    }
  );
}
getClip();