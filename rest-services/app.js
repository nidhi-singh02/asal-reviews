const express = require('express'),
      http = require('http'),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      app = express(),
      expressValidator = require('express-validator'),
      userRoutes = require('./Routers/route')

app.use(cors());
app.use(expressValidator())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/',userRoutes)


http.createServer(app).listen(8196);
console.log("Listening");

module.exports = app;
