const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const { createUser, addUserRatings, updateUserLevel, getUser, getUserById, getAllUsers } = require("./handlers/userHandlers");
const { createQuest, addQuestParticipant, completeQuest, deleteQuest, getQuest, getUsersQuests, getAllQuests } = require("./handlers/questHandlers");
const { getAllFirstGenPokemon } = require("./handlers/avatarHandlers");
const { createReport, getAllReports, markReport } = require("./handlers/reportHandlers");

const PORT = 8000;
const domain = process.env.REACT_APP_AUTH0_DOM;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const googleMaps = process.env.REACT_APP_GOOGLE_MAPS_API;
const cloudinary = process.env.CLOUDINARY_URL;
const cloudName = process.env.CLOUD_NAME;

express()
  .use(helmet())
  .use(morgan("tiny"))
  .use(express.json())

  // Endpoint to send API credentials required by front end
  // TO DO: encrypt credentials
  .get("/cred", function (req, res) {
    res.status(200).json({ domain, clientId, googleMaps, cloudinary, cloudName });
  })

  // Endpoint to create new User
  .post("/new-user", createUser)

  // Endpoint to add ratings
  .patch("/user/:id", addUserRatings)
  
  // Endpoint to update user level
  .patch("/user-level/:id", updateUserLevel)

  // Endpoint to get logged in user details on log in
  .post("/user", getUser)

  // Endpoint to get logged in user details by Id
  .get("/user/:id", getUserById)

  // Endpoint to send all users
  .get("/users", getAllUsers)

  // Endpoint to report a user to Admin
  .post("/report/:id", createReport)

  // Endpoint to get all user reports
  .get("/reports", getAllReports)
  
  // Endpoint to create new quest
  .post("/new-quest/:ownerId", createQuest)
  
  // Endpoint to add participant to quest
  .patch("/quest/:id", addQuestParticipant)

  // Endpoint to mark quest as complete
  .patch("/completed-quest/:id", completeQuest)

  // Endpoint to delete quest
  .delete("/quest/:id", deleteQuest)

  // Endpoint to get particular quest
  .get("/quest/:id", getQuest)

  // Endpoint to get all logged in user's quests
  .get("/quests/:id", getUsersQuests)

  // Endpoint to get all quests
  .get("/quests", getAllQuests)

  // Endpoint to get all first gen pokemon sprites
  .get("/avatars", getAllFirstGenPokemon)

  .listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
