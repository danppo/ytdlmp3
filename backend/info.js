const Ymp3 = require('./index');
const ytdl = require('ytdl-core');

const y = new Ymp3();

console.log(ytdl('sVx1mJDeUjY').getInfo);
