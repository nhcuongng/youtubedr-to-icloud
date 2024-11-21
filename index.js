const fs = require('fs-extra');
const { getYoutubeMyMix } = require('./youtube-my-mix');
const { getMusicTrending } = require('./youtube-trending');
const { sleep } = require('./utils');

var list = [];

(async () => {
    await getMusicTrending();
    await getYoutubeMyMix();

    // fs.copy('./youtube', '/Users/cuongnguyenhuu/Library/Mobile Documents/com~apple~CloudDocs/my-music', err =>{
    //   if(err) return console.error(err);
    //   console.log('success!');
    // });
})()
