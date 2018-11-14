//  Import the external libraries
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");

// Include custom Router we created

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

// Import Keys
const uri = require("./config/keys").mongoURI;

// Initialize the app
const app = express();
// parse application/x-www-form-urlencoded
app.use(
  bodyparser.urlencoded({
    extended: false
  })
);

// parse application/json
app.use(bodyparser.json());

mongoose
  .connect(
    uri,
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log("DB connected success"))
  .catch(err => console.log(err));

// passport middleware added

app.use(passport.initialize());

// include passport stratagy

require("./config/passport")(passport);

// Use our router

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

app.get("/", (req, res) => {
  res.json({ success: "welcome to amarnath rest api" });
});

//  Assigning the port eg. http://localhost:5000 for local environment for heroku we use process.env.port
const port = process.env.PORT || 5000;

// finally app listen the port 5000
app.listen(port, () => {
  console.log(`Port listen on : ${port}`);
});
