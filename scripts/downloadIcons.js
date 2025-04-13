const fs = require("fs");
const path = require("path");
const https = require("https");

const icons = [
  {
    name: "book-icon.png",
    url: "https://cdn-icons-png.flaticon.com/512/2232/2232688.png",
  },
  {
    name: "music-icon.png",
    url: "https://cdn-icons-png.flaticon.com/512/3659/3659784.png",
  },
  {
    name: "food-icon.png",
    url: "https://cdn-icons-png.flaticon.com/512/3174/3174880.png",
  },
  {
    name: "language-icon.png",
    url: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
  },
  {
    name: "art-icon.png",
    url: "https://cdn-icons-png.flaticon.com/512/3659/3659897.png",
  },
  {
    name: "games-icon.png",
    url: "https://cdn-icons-png.flaticon.com/512/3659/3659899.png",
  },
  {
    name: "innovation-icon.png",
    url: "https://cdn-icons-png.flaticon.com/512/3659/3659871.png",
  },
];

const publicDir = path.join(__dirname, "../client/public/icons");

// Create icons directory if it doesn't exist
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Download each icon
icons.forEach((icon) => {
  const filePath = path.join(publicDir, icon.name);
  const file = fs.createWriteStream(filePath);

  https
    .get(icon.url, (response) => {
      response.pipe(file);

      file.on("finish", () => {
        file.close();
        console.log(`Downloaded ${icon.name}`);
      });
    })
    .on("error", (err) => {
      fs.unlink(filePath, () => {}); // Delete the file if download fails
      console.error(`Error downloading ${icon.name}:`, err.message);
    });
});
