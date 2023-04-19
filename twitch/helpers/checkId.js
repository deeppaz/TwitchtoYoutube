const data = require("../data.json");
const fs = require("fs");
// const clipID = require("../clipIds.txt")


var array = fs.readFileSync('../clipIds.txt', 'utf8').split('\n');

const waitFor = (ms) => new Promise(r => setTimeout(r, ms))
const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const start = asyncForEach(array, async (num) => {
  await waitFor(50)
  console.log(num)
})

console.log(start)