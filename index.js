const request = require('./node_modules/request-promise');
const cheerio = require('cheerio');
// const iconv = require('./node_modules/iconv-lite');
// var encoding = 'utf-8';

const site = "https://beebom.com/android-tv-background-audio-streaming/";

(async () => {
    let data = [];
    const response = await request({
        uri: site,
        headers: {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-encoding": "gzip",
            "accept-language": "en-US,en;q=0.9,pt;q=0.8"
        },
        gzip: true
    });

    let $ = cheerio.load((response));
    let blogTitle = $(".entry-title").text().trim();
    let description = $('div[class="td-post-content"]').text();
    let image = $('img').attr('src');

    console.log(image);

})();

// request('https://beebom.com/android-tv-background-audio-streaming/', (error, response, html) => {
//     if (!error && response.statusCode == 200) {
//         const $ = cheerio.load(html);

//         $('.post-preview').each((i, el) => {
//             const title = $(el)
//                 .find('.post-title')
//                 .text()
//                 .replace(/\s\s+/g, '');
//             const link = $(el)
//                 .find('a')
//                 .attr('href');
//             const date = $(el)
//                 .find('.post-date')
//                 .text()
//                 .replace(/,/, '');
//         });