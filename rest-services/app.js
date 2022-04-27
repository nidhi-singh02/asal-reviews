const express = require("express"),
  http = require("http"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  app = express(),
  expressValidator = require("express-validator"),
  userRoutes = require("./Routers/route");

app.use(cors());
app.use(expressValidator());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// setting for cookie-session
app.use(
  cookieSession({
    signed: false,
    secure: false, // true for cookie to be sent over HTTPS, false for HTTP
  })
);

app.use("/", userRoutes);

app.all("*", async (req, res) => {
  throw new Error("Not Found");
});

app.use((err, req, res, next) => {
  if (err instanceof Error) {
    return res.status(err.statusCode).send({ errors: err.message });
  }
  console.error(err);
  res.status(400).send({
    errors: [{ message: "Something went wrong" }],
  });
});

http.createServer(app).listen(8196);
console.log("Listening");

module.exports = app;
