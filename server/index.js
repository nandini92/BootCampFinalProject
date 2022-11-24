const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const { createUser, getUser, getAllUsers } = require("./handlers/userHandlers");
const { createQuest, getAllQuests } = require("./handlers/questHandlers");
const { getAllFirstGenPokemon } = require("./handlers/avatarHandlers")

const PORT = 8000;
const domain = process.env.REACT_APP_AUTH0_DOM;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const googleMaps = process.env.REACT_APP_GOOGLE_MAPS_API;
const cloudinary = process.env.CLOUDINARY_URL;

express()
  .use(helmet())
  .use(morgan("tiny"))
  .use(express.json())

  // Endpoint to send API credentials required by front end
  .get("/cred", function (req, res) {
    res.status(200).json({ domain, clientId, googleMaps, cloudinary });
  })

  // Endpoint to create new User
  .post("/new-user", createUser)

  // Endpoint to get logged in user details
  .post("/user", getUser)

  // Endpoint to send all users
  .get("/users", getAllUsers)

  // Endpoint to send all quests
  .get("/quests", getAllQuests)

  // Endpoint to create new quest
  .post("/new-quest/:ownerId", createQuest)

  // Endpoint to get all first gen pokemon sprites
  .get("/avatars", getAllFirstGenPokemon)

  .listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
