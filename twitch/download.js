const Downloader = require('node-url-downloader');
const getData = require('./data.json');

var posted = [];
var readyToPost = getData;
var currentPost = readyToPost[Math.floor(Math.random() * readyToPost.length)];
posted.push(currentPost.thumbnail_url.split("-preview")[0] +".mp4");
// console.log(getData);
const url = posted[0];
const download = new Downloader();
download.get(url, "./clips");
download.on('done', (dst) => {
  console.log(dst)
});