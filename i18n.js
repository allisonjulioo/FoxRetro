const path = require("path");
const fs = require("fs");
const _ = require("lodash");
const jsonServer = require("json-server");

const server = jsonServer.create();
const port = 3030;

let obj = {};
let files = fs.readdirSync(path.resolve(__dirname, "./src/assets/i18n/"));

files.forEach(file => {
  if (file.indexOf(".json") > -1) {
    _.extend(obj, require(path.resolve(__dirname, "./src/assets/i18n/", file)));
  }
});

const router = jsonServer.router(obj);

server.use(jsonServer.defaults());
server.use(router);

server.listen(port, () => {
  console.log(`lang routes runing port ${port}`);
});
