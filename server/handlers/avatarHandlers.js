require("dotenv").config();
const cloudinary = require("cloudinary").v2;

const getAllFirstGenPokemon = (req, res) => {
  try {
    // Gets list of cloudinary objects for First Gen pokemon
    cloudinary.api.resources_by_tag("1st_gen", {max_results: 64})
    .then((results) => {
      return results.resources.map(result => {
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
};

module.exports = { getAllFirstGenPokemon };
