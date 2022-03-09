"use strict";

const express = require("express");
const open = require("open");
const app = express();

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/web/main.html");
});

app.use(express.static(__dirname + "/web/"));

app.listen(3000, () => {
    console.log("Listening on http://127.0.0.1:3000");
    open("http://127.0.0.1:3000/");
});
