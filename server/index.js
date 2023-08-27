const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/db.js");
const nodemon = require("nodemon");
dotenv.config();
const route = require("./routes/index.js");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.json({ limit: 50, extended: false }));
app.use(express.urlencoded({ limit: 50, extended: false }));

app.listen(5000, () => {
  console.log("Port runnung");
});
dbConnect();

app.use(route);
