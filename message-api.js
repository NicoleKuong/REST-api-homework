const express = require("express");
const port = 3000;
const bodyParser = require("body-parser");
const app = express();

const parserMiddleware = bodyParser.json();
app.use(parserMiddleware);

app.post("/messages", (req, res) => {
  const text = req.body.text;
  console.log(text);
  res.send({ message: "This is the message that was sent" });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
