// Get data from mongoose to connect between frontend and backend
const mongoose = require("mongoose");

require("dotenv").config();
let dbURI = process.env.DB_LINK; 

// TODO: Connect to MangoDB
mongoose.connect(dbURI,{useUnifiedTopology:true});


// Check if connection is successfull
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

module.exports = mongoose;

