const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const notesRoutes = require("./routes/notesRoutes");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use("/notes", notesRoutes);
app.use(errorHandler);

module.exports = app;
