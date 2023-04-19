const fs = require("fs");
const data = require("./data.json");

let file_name = "./clipIds.txt";

//txt
for (let i = 0; i < data.length; i++) {
  // fs.appendFileSync(file_path + file_name, data[i].id + "," + "\n");
  fs.appendFileSync(file_name, data[i].id + "\n");
  console.log(data[i].id + " is successfuly writed to file");

  // console.log(data[i].id.includes('InquisitiveInterestingWatermelonDBstyle'));
}