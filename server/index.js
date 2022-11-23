const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const { getAllUsers } = require("./handlers/userHandlers");
const { createQuest, getAllQuests } = require("./handlers/questHandlers");

const PORT = 8000;
const domain = process.env.REACT_APP_AUTH0_DOM;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const googleMaps = process.env.REACT_APP_GOOGLE_MAPS_API;

express()
  .use(helmet())
  .use(morgan("tiny"))
  .use(express.json())

  // Endpoint to send API credentials required by front end
  .get("/cred", function (req, res) {
    res.status(200).json({ domain, clientId, googleMaps });
  })

  // Endpoint to send all users
  .get("/users", getAllUsers)

  // Endpoint to send all quests
  .get("/quests", getAllQuests)

  // Endpoint to create new quest
  .post("/new-quest/:ownerId", createQuest)

  .listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
