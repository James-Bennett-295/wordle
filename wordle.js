const express = require("express");
const app = express();

app.use(express.static(__dirname + "/web/"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/web/main.html");
})

app.listen(3000, () => {
    console.log("Listening on http://127.0.0.1:3000");
});
