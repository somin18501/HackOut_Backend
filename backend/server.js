const express = require("express");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const connectDB = require("./database/connection");
const cors = require("cors");
const PMS = express();

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8000;

// console.log("Developement", process.env.production);
connectDB();
PMS.use(
  cors({
    origin: "https://64eb76a704ddee75f6bdd143--fastidious-swan-f16923.netlify.app",
    // origin: "http://localhost:3000",
    credentials: true, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

PMS.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

PMS.use(express.json());
PMS.use(bodyparser.urlencoded({ extended: true }));

PMS.use("/", require("./routes/router"));

PMS.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
