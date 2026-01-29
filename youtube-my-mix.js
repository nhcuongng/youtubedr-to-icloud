const path = require("path");
const puppeteer = require("puppeteer");
const {
  download,
  sleep,
  waitUntilDownload,
  folderToSaveMusic,
} = require("./utils");
const { extractMusic } = require("./downloader");

async function getYoutubeMyMix() {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  await page.goto(
    "https://youtube.com/playlist?list=PLbq0bnR54OKvZl21kmBTNFbP39jb1k4oQ&si=alqEpwkCcz8rKDVQ",
  );

  var parentPath = "#contents.style-scope.ytd-playlist-video-list-renderer";

  await page.waitForSelector(parentPath);

  const links = await page.evaluate(() => {
    function stringToSlug(str) {
      // remove accents
      var from =
          "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ ",
        to =
          "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy_";
      for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(RegExp(from[i], "gi"), to[i]);
      }

      str = str
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\-]/g, "-")
        .replace(/-+/g, "-");

      return str;
    }

    var parentPath = "#contents.style-scope.ytd-playlist-video-list-renderer";

    const parentEl = document.querySelector(parentPath);

    let elements = Array.from(
      parentEl.querySelectorAll(
        `.style-scope.ytd-playlist-video-list-renderer`,
      ),
    );

    const mixed = elements.reduce((acc, cur) => {
      const elementVideo = cur.querySelector("#video-title");
      console.log("🚀 ~ getYoutubeMyMix ~ elementVideo:", elementVideo);
      const title = elementVideo?.getAttribute("title");
      if (title) {
        acc.push({
          href: `https://www.youtube.com${elementVideo?.getAttribute("href").split("&")[0]}`,
          title: stringToSlug(elementVideo?.getAttribute("title") || ""),
        });
      }

      return acc;
    }, []);
    return mixed;
  });

  extractMusic(links);

  await browser.close();
}

exports.getYoutubeMyMix = getYoutubeMyMix;
