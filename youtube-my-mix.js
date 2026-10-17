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
    // headless: false,
  });
  const page = await browser.newPage();

  await page.goto(
    "https://www.youtube.com/playlist?list=PLbq0bnR54OKvZl21kmBTNFbP39jb1k4oQ",
  );

  var parentPath = "#contents";

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

    var parentPath = "#contents";

    const parentEl = document.querySelector(parentPath);

    let elements = Array.from(
      parentEl.querySelectorAll(
        `.ytd-playlist-video-list-renderer`,
      ),
    );

    const mixed = Array.from(parentEl.childNodes).reduce((acc, elementVideo) => {
      const title = elementVideo?.data?.metadata?.lockupMetadataViewModel?.title?.content;
      if (title) {
        acc.push({
          href: `https://www.youtube.com/watch?v=${elementVideo?.data?.contentId}`,
          title,
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
