const request = require("./node_modules/request-promise");
const cheerio = require("cheerio");
const prompt = require("prompt-sync")();
const imageDownloader = require("node-image-downloader");

// const site = prompt("Enter beebom post link\n");
// console.log(`Site link: ${site}\n`);
// console.log(
//   "-------------------------------------------------------------------\n",
// );
const site = "https://beebom.com/spotify-employees-work-from-home-2020/";

(async () => {
  let data = [];
  const response = await request({
    uri: site,
    headers: {
      "accept":
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-encoding": "gzip, deflate,utf-8",
      "accept-language": "en-US,en;q=0.9,pt;q=0.8",
    },
    gzip: true,
  });

  let $ = cheerio.load((response), { xmlMode: true });

  let blogTitle = $(".entry-title").text().trim();

  let heroImage = $(
    ".td-post-content > img",
  ).attr("src");

  console.log(`Hero Image : ${heroImage}`);

  imageDownloader({
    imgs: [
      {
        uri: heroImage,
      },
    ],
    dest: "./downloads", //destination folder
  });

  console.log(
    "-------------------------------------------------------------------\n",
  );

  let description = $(".td-post-content p").each((i, el) => {
    const item = $(el).text().trim();
    console.log(item);
  });

  console.log(
    "-------------------------------------------------------------------\n",
  );

  let images = ["Saab", "Volvo", "BMW"];
  $("img").each((i, el) => {
    const item = $(el).attr("src");
    // console.log(item);
    images.push(`${item}`);
  });
  for (let i = 0; i <= images.length; i++) {
    console.log(images[i]);
  }
  console.log(
    "-------------------------------------------------------------------\n",
  );
  console.log(`Title : ${blogTitle}`);
})();
