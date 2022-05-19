const fs = require("fs");
const { data } = require("./data.json");

var originalNoteString = (data[97].id).toString().split("\n");
fs.writeFileSync("notes.txt", JSON.stringify(originalNoteString));
