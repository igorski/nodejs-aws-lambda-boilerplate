"use strict";

const express = require('express');
const app = express();
const compression = require('compression');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// initialize Router
const routes = require("./config/Routes");
app.use('/', routes);

app.use(compression());

module.exports = app;
