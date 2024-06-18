const express = require('express');
const app = express();
const cors = require("cors");
const AdminRouter = require("./routes/AdminRouter");
const bodyParser = require("body-parser");

const PORT = 3000;
console.log('PORT', PORT);

app.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      // This is required because bodyParser.json by default doesn't include the raw body
      req.rawBody = buf;
    },
    limit: '5mb',
  }),
);
app.use(cors());

app.use("/admin/", AdminRouter)

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,X-Access-Token,X-Key"
  );
  if (req.method == "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

app.listen(PORT, () => {
  console.log('Server is runing', PORT)
})