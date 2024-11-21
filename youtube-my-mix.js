const path = require('path');
const puppeteer = require("puppeteer");
const { download, sleep, waitUntilDownload, folderToSaveMusic } = require('./utils');

async function getYoutubeMyMix() {
    const browser = await puppeteer.launch({
        // headless: false,
    })
    const page = await browser.newPage();

    await page.goto('https://www.youtube.com/watch?v=YfJhjI74BeA&list=RDMMYfJhjI74BeA&start_radio=1');

    const playlist = '#secondary #playlist .playlist-items a.yt-simple-endpoint'

    await page.waitForSelector('.playlist-items a.yt-simple-endpoint')

    const links = await page.evaluate(() => {
        let elements = Array.from(document.querySelectorAll('.playlist-items a.yt-simple-endpoint'));
        const mixed = elements.reduce((acc, cur) => {
            const elementVideo = cur.querySelector('#video-title');
            const title = elementVideo?.getAttribute('title')
            if (title) {
                acc.push({
                    href: cur.href.split('&')[0],
                    title: elementVideo?.getAttribute('title') || '',
                })
            }

            return acc;
        }, [])
        return mixed;
    });

    console.log({ links, teee: links.length })

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

exports.getYoutubeMyMix = getYoutubeMyMix
