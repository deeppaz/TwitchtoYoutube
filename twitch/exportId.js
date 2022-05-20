const fs = require("fs");
const { data } = require("./data.json");

let file_path = "./twitch/";
let file_name = "clipIds.txt";

// json
// for (let i in data) {
//   console.log(JSON.stringify(data[i].id));

//   fs.appendFileSync(
//     file_path + file_name,
//     JSON.stringify(data[i].id, null, 4),
//     function (err) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("JSON saved!");
//       }
//     }
//   );
// }

//txt
for (let i = 0; i < data.length; i++) {
  fs.appendFileSync(file_path + file_name, data[i].id + "," + "\n");
  console.log(data[i].id + " is successfuly writed to file")
}
