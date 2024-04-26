require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const users = require("./models/userSchema");
const cors = require("cors");
const router = require("./routes/router");

require("./db/Conn");

app.use(cors());
app.use(express.json());

app.use(router);
const port = 8000;
app.listen(port, () => {
  console.log(`server is start at port number ${port}`);
});
