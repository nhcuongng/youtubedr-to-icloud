const path = require('path');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitUntilDownload(page, fileName = '') {
    return new Promise((resolve, reject) => {
        page._client().on('Page.downloadProgress', e => { // or 'Browser.downloadProgress'
            if (e.state === 'completed') {
                resolve(fileName);
            } else if (e.state === 'canceled') {
                reject();
            } else if (e.state === 'inProgress') {
                const percent = (e.receivedBytes / e.totalBytes) * 100;
                // console.log(percent + '%' + '\r')
                process.stdout.write('Downloading ' + percent + '% complete... \r');
            }
        });
    });
}

async function download(browser, url, folderName) {
    console.log('Starting download...')
  const page = await browser.newPage();

  page.setDefaultNavigationTimeout(60000);
  
  // Enable CDP
  const client = await page.target().createCDPSession();

  // Set download behavior
  await client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: path.resolve(__dirname, `youtube/${folderName}`)
  });

  await page.goto('https://y2mate.nu/en-1naP/');

  await page.type('#video', url)

  await page.click('body > form > div:nth-child(2) > button:nth-child(3)')

  await page.waitForSelector('body > form > div:nth-child(2) > button:nth-child(1)')

  await page.click('body > form > div:nth-child(2) > button:nth-child(1)');

  await waitUntilDownload(page);
};

exports.sleep = sleep;
exports.waitUntilDownload = waitUntilDownload;
exports.download = download;