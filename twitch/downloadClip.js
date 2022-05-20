const axios = require("axios");
const fs = require("fs");
require("dotenv").config()

const clipIds = fs.readFileSync("./twitch/clipIds.txt").toString().split("\n");

const gqlData = [];

for (const clipId of clipIds) {
  gqlData.push({
    operationName: "VideoAccessToken_Clip",
    variables: {
      slug: clipId
    },
    extensions: {
      persistedQuery: {
        version: 1,
        sha256Hash:
          process.env.SHA256HASH
      }
    }
  });
}

axios
  .post("https://gql.twitch.tv/gql", gqlData, {
    headers: {
      "Client-ID": process.env.CLIENT_IID
    }
  })
  .then(({ data }) => {
    for (const [key, entry] of data.entries()) {
      const clip = entry.data.clip;
      let bestQuality = 0;
      let qualityIndex = -1;

      for (const [videoKey, videoQuality] of clip.videoQualities.entries()) {
        const thisQuality = parseInt(videoQuality.quality);
        bestQuality = Math.max(thisQuality, bestQuality);

        if (bestQuality === thisQuality) {
          qualityIndex = videoKey;
        }
      }

      if (qualityIndex === -1) {
        console.error("No video quality found for ", clip);
        continue;
      }

      const downloadUrl =
        clip.videoQualities[qualityIndex].sourceURL +
        "?sig=" +
        clip.playbackAccessToken.signature +
        "&token=" +
        encodeURIComponent(clip.playbackAccessToken.value);

      if (!fs.existsSync("./twitch/clips")) {
        fs.mkdirSync("./twitch/clips");
      }

      const writer = fs.createWriteStream(
        "./twitch/clips/" + clipIds[key] + ".mp4"
      );

      axios
        .get(downloadUrl, { responseType: "stream" })
        .then(({ data }) => {
          return new Promise((resolve, reject) => {
            data.pipe(writer);
            let error = null;
            writer.on("error", (err) => {
              this.log("error", "Download failed", err);

              error = err;
              writer.close();
              reject(err);
            });
            writer.on("close", () => {
              if (!error) {
                console.log(`Download ${clipIds[key]} completed.`);
                resolve();
              }
            });
          });
        })
        .catch(() => {
          console.log(`Download ${clipIds[key]} failed.`);
        });
    }
  });
