//importing required modules
const express = require("express");
const adminAuth = require("./api/routes/adminAuth");
const workspaces = require("./api/routes/workspaces");
const users = require("./api/routes/users");
const contacts = require("./api/routes/contacts");
const message = require("./api/routes/messages");
const campaigns = require("./api/routes/campaigns");
const app = express();

///parsing body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//defining routes

//admin route
app.use("/admin", adminAuth);

//workspace route
app.use("/workspaces", workspaces);

//users route
app.use("/users", users);

//contacts route
app.use("/contacts", contacts);

//messages route
app.use("/messages", message);

//campaigns route
app.use("/campaigns", campaigns);

//error handling
app.use((req, res, next) => {
  const error = new Error("Not found!!");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: "Here",
    error: err.message,
  });
});
module.exports = app;
