const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const { createUser, getUser, getUserById, getAllUsers } = require("./handlers/userHandlers");
const { createQuest, addQuestParticipant, deleteQuest, getQuest, getUsersQuests, getAllQuests } = require("./handlers/questHandlers");
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

  // Endpoint to get logged in user details on log in
  .post("/user", getUser)

  // Endpoint to get logged in user details by Id
  .get("/user/:id", getUserById)

  // Endpoint to send all users
  .get("/users", getAllUsers)
  
  // Endpoint to create new quest
  .post("/new-quest/:ownerId", createQuest)
  
  // Endpoint to create new quest
  .patch("/quest/:id", addQuestParticipant)

  // Endpoint to delete quest
  .delete("/quest/:id", deleteQuest)

  // Endpoint to send particular quest
  .get("/quest/:id", getQuest)

  // Endpoint to send all quests
  .get("/quests/:id", getUsersQuests)

  // Endpoint to send all quests
  .get("/quests", getAllQuests)

  // Endpoint to get all first gen pokemon sprites
  .get("/avatars", getAllFirstGenPokemon)

  .listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
