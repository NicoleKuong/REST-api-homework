const express = require("express");
const port = 4000;
const bodyParser = require("body-parser");
const movieRouter = require("./router");
const app = express();

const parserMiddleware = bodyParser.json();
app.use(parserMiddleware);

app.use(movieRouter);
// app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
