//  Import the external libraries
const express = require('express');
const mongoose = require('mongoose');

// Import Keys
const uri = require('./config/keys').mongoURI;

// Initialize the app
const app = express();

mongoose
  .connect(uri, {
    useNewUrlParser: true
  })
  .then(() => console.log("DB connected success"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send(`Welcome to worlds`);
});

//  Assigning the port eg. http://localhost/3000 for local environment for heroku we use process.env.port
const port = process.env.PORT || 3000;

// finally app listen the port 3000
app.listen(port, () => {
  console.log(`Port listen on : ${port}`);
});