const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

require("./db/db");

const login = require("./routes/login");
const signup = require("./routes/signup");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.use("/", login);
app.use("/signup", signup);

app.use(morgan("combined"));

app.listen(PORT, (error) => {
  if (!error) {
    console.log(
      "Server is Successfully Running and App is listening on port " + PORT
    );
  } else {
    console.log("Error occurred, server can't start", error);
  }
});
