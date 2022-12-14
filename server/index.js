const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(helmet());
app.use(morgan("tiny"));
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "https://poke-quest.onrender.com"],
  })
);

app.use(require("./handlers/avatarHandlers"));
app.use(require("./handlers/userHandlers"));
app.use(require("./handlers/questHandlers"));
app.use(require("./handlers/reportHandlers"));

const server = app.listen(PORT, () => {
  console.log("🌍 Listening on port " + server.address().port);
});
