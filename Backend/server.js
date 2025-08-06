const express = require("express");
const app = require("./app");
const { default: mongoose } = require("mongoose");
const PORT = process.env.PORT || 8000;
require("dotenv").config();

//Mongo connection
mongoose
  .connect(
    "mongodb+srv://diyadhardev:" +
      process.env.MONGO_PASS +
      "@cluster0.rkza2ea.mongodb.net/Outreach-hub"
  )
  .then(() => {
    console.log("Connected successfully");
  });

//app initialise
app.listen(PORT, () => {
  console.log(`server is listening...`);
});
