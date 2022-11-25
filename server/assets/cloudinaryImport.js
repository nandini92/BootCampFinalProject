const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const path = require("path");
const fs = require("fs");
const { CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

// Doc: https://medium.com/stackfame/get-list-of-all-files-in-a-directory-in-node-js-befd31677ec5
const uploadFiles = (directoryPath, folder) => {
  fs.readdir(directoryPath, function (err, files) {
    // handle errors
    if (err) {
      return console.log("Unable to scan directory:" + err);
    }

    files.forEach((file) => {
      cloudinary.uploader
        .upload(`${directoryPath}/${file}`, {
          folder: folder,
          use_filename: true,
          transformation: [{width: 100, crop: "scale"}, {gravity: "face", height: 100, width: 100, crop: "thumb"}]
        })
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
    });
  });
};

// uploadFiles(path.join(__dirname, "PokemonAvatars/1st_generation"), "Pokémon/1st_generation");
// uploadFiles(path.join(__dirname, "PokemonAvatars/1st_evolution"), "Pokémon/1st_evolution");
// uploadFiles(path.join(__dirname, "PokemonAvatars/2nd_evolution"), "Pokémon/2nd_evolution");
// uploadFiles(path.join(__dirname, "PokemonAvatars/legendary"), "Pokémon/legendary");
// uploadFiles(path.join(__dirname, "PokemonAvatars/misc"), "Pokémon/misc");