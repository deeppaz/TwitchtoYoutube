const TwitchApi = require("node-twitch").default;
require("dotenv").config()

const twitch = new TwitchApi({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET
});

async function getClips(){
    const clips = await twitch.getClips({broadcaster_id: "123"})
    console.log(clips)
}
getClips();

// async function getUserId(loginName) {
//   const users = await twitch.getUsers(loginName);
//   const user = users.data[0];
//   const userId = user.id;

//   console.log(userId);
// }

// getUserId("abc");

