const express = require('express');
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname + '/dist/fox-retro/'));
app.get(/.*/, function (req, res) {
  res.sendFile(__dirname + '/dist/fox-retro/index.html');
});
app.listen(port);

console.log('Server started...');
