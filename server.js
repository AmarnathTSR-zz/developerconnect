//  Import the external libraries
const express = require("express");

// Initialize the app
const app = express();

app.get("/", (req, res) => {
  res.send(`Welcome to worlds`);
});

//  Assigning the port eg. http://localhost/3000 for local environment for heroku we use process.env.port
const port = process.env.PORT || 3000;

// finally app listen the port 3000
app.listen(port, () => {
  console.log(`Port listen on : ${port}`);
});
