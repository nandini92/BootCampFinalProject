require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const router = require("express").Router();

router.get("/avatars", (req, res) => {
  try {
    // Gets list of cloudinary objects for First Gen pokemon
    cloudinary.config({ 
      cloud_name: process.env.CLOUD_NAME, 
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
  });

    cloudinary.api.resources_by_tag("1st_gen", {max_results: 64})
    .then((results) => {
      return results.resources.map(result => {
        console.log(result);
            return {public_id: result.public_id, asset_id: result.asset_id};
        });
      })
    .then(data => {
        return data
        ? res.status(201).json({ status: 201, data, message: "SUCCESS: Avatars returned." })
        : res.status(500).json({ status: 500, message: "ERROR: Internal server error." });
    })
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "ERROR: Internal server error." });
  }
});

module.exports = router;
