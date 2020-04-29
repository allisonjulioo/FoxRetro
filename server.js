const express = require("express");
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname + "/dist/vamoretro/"));
app.get(/.*/, function(req, res) {
  res.sendFile(__dirname + "/dist/vamoretro/index.html");
});
app.listen(port);

console.log("Server started...");
