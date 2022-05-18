const TwitchApi = require("node-twitch").default;
require("dotenv").config()

const twitch = new TwitchApi({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET
});

async function getClips(){
    const clips = await twitch.getClips({broadcaster_id: "200748723"})
    console.log(clips)
}
getClips();