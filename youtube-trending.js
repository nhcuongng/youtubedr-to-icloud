const path = require('path');
const puppeteer = require("puppeteer");
const { download, sleep, waitUntilDownload } = require('./utils');

async function getMusicTrending() {
    const browser = await puppeteer.launch({
        // headless: false,
    })
    const page = await browser.newPage();

    await page.goto('https://www.youtube.com/feed/trending?bp=4gINGgt5dG1hX2NoYXJ0cw%3D%3D');

    const links = await page.evaluate(() => {
        let elements = Array.from(document.querySelectorAll('.title-and-badge a'));
        let info = elements.map(element => {
            return {
                href: element.href,
                title: element.title,
            }
        })
        return info;
    });

    for (let i = 0; i < links.length; i++) {
        const page1 = await browser.newPage();
        if (i > 0) {
            console.log('\n-------------------------------\n');
        }
        console.log('Bài hát: ', links[i].title);
        await download(browser, links[i].href, path.basename(__filename).split('.')[0]);
        await page1.close()
    }

    await browser.close()
}

exports.getMusicTrending = getMusicTrending
