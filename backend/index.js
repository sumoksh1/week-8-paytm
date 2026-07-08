const express = require("express");
const mainRouter = require("./routes/index");
const cors = require("cors");

const app = express();

app.use("/api/v1", mainRouter);