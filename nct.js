
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');
const puppeteer = require("puppeteer");

const extractListGenre = ($) => {
    return $('body > div:nth-child(13) > div.wrap > div > div.box-left > div.list_music_full > div > div.list_music.listGenre > div > ul > li > div > div.info_song > a').map((_, a) => {
        return $(a).attr('href');
    }).toArray();
}

const downloadFromNct = async (url) => {
  const browser = await puppeteer.launch({
    // headless: false,
    // executablePath: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'
  });
  const page = await browser.newPage();

  page.setDefaultNavigationTimeout(60000);
  
  // Enable CDP
  const client = await page.target().createCDPSession();

  await page.goto(url);

  // Click the download button
  await page.click('#btnDownloadBox');

//   // Wait for download to complete
  await page.waitForSelector('#downloadBasic');

  await sleep(5000)

  await page.click('#downloadBasic')

    // Set download behavior
  await client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: path.resolve(__dirname, 'downloads')
  });

    // Monitor download progress
  client.on('Page.downloadProgress', (event) => {
    if (event.state === 'completed') {
      console.log('Download completed');
    }
  });
  
//   // Wait for some time to ensure download starts
  await sleep(5000);
  
  await browser.close();
}

axios.get('https://www.nhaccuatui.com/bai-hat/bai-hat-moi.html')
    .then(({ data }) => {
          const $ = cheerio.load(data); // Initialize cheerio
            const links = extractListGenre($);
            // links.forEach(link => {
            //     downloadFromNct(link)
            // })
            console.log(links[0])
            // downloadFromNct(links[1])

    });
