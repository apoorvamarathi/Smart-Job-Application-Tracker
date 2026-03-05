const express = require("express");
require("./db");

const app = express();

app.listen(5000, () => {
  console.log("Server running");
});