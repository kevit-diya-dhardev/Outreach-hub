//importing required modules
const express = require("express");
const adminAuth = require("./api/routes/adminAuth");
const workspaces = require("./api/routes/workspaces");
const app = express();

///parsing body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//defining routes
app.use("/admin", adminAuth);
app.use("/workspaces", workspaces);

//error handling
app.use((req, res, next) => {
  const error = new Error("Not found!!");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message,
  });
});
module.exports = app;
