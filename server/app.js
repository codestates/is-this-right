const express = require("express");
const cors = require("cors");
// const controllers = require("./controllers");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
const port = 80;

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(201).send("Welcome to 이거맞아? API Server!");
});

app.listen(port, () => {
  console.log(`서버가 ${port}번에서 작동중입니다.`);
});
