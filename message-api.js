const express = require("express");
const port = 3000;
const bodyParser = require("body-parser");
const app = express();

let numberOfRequests = 0;
function numberOfRequestMiddleware(req, res, next) {
  if (numberOfRequests > 5) {
    res.status(429).end();
  } else {
    next();
  }
}

const parserMiddleware = bodyParser.json();
app.use(parserMiddleware);

app.use(numberOfRequestMiddleware);
app.post("/messages", (req, res) => {
  numberOfRequests++;
  const text = req.body.text;
  console.log(text);
  if (!text || text === "") {
    res.status(400).end();
  } else {
    res.status(200).send({ message: "This is the message that was sent" });
  }
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
