const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const passport = require("passport");
const path = require("path");

const app = express();

//Body parser middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB CONFIG
const db = require("./config/keys").mongoURI;

//Connect to MongoDB

mongoose
  .connect(db)
  .then(x => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//Passport Middleware

app.use(passport.initialize());

//Passport Config
require("./config/passport.js")(passport);

//USE Routes

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

//SERVE Static Assests if in Prosduction

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 1920;

app.listen(port, () => console.log(`Server running on port ${port}`));
