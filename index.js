const fs = require("fs-extra");
const { getYoutubeMyMix } = require("./youtube-my-mix");
var { DOWNLOAD_FOLDER } = require("./utils");

(async () => {
  await getYoutubeMyMix();
})();
