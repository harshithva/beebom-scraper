const request = require("./node_modules/request-promise");
const cheerio = require("cheerio");
const prompt = require("prompt-sync")();
const imageDownloader = require("node-image-downloader");
const download = require("images-downloader").images;

// const site = prompt("Enter beebom post link\n");
// console.log(`Site link: ${site}\n`);
console.log(
  "-------------------------------------------------------------------\n",
);
const site =
  "https://beebom.com/biovyzr-face-shield-with-built-in-air-purifier-system/";

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
    "td-post-content > img",
  ).attr("src");
  console.log(heroImage);

  let img = [];
  img.push(heroImage);

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

  let imagesArray = new Array();
  $("img").each((i, el) => {
    let item = $(el).attr("src");

    if (item) {
      if (item.endsWith("jpg" || "jpeg")) {
        console.log(item);
        imagesArray.push(item.trim().toString());
      }
    }
  });
  // for (let i = 0; i <= imagesArray.length; i++) {
  //   console.log(imagesArray[i]);
  // }

  const dest = "downloads";
  download(imagesArray, dest)
    .then((result) => {
      console.log("Images downloaded", result);
    })
    .catch((error) => console.log("downloaded error", error));

  console.log(
    "-------------------------------------------------------------------\n",
  );
  console.log(`Title : ${blogTitle}`);
})();
