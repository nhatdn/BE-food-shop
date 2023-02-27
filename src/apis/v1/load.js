const path = require("path");
const env = require("dotenv");
env.config({ path: path.resolve(__dirname, "../../.env") });
const config = require("../../configs/configs");
const database = require("../../configs/database");
const express = require("express");
const app = express();
const auth = require("./routes/auth.routes");
const body_parser = require("body-parser");
var redis = require('redis');
var JWTR =  require('jwt-redis').default;
var redisClient = redis.createClient();
var jwtr = new JWTR(redisClient);
global.jwtr = jwtr;

module.exports = {
  app,
  auth,
  config,
  body_parser,
  database,
};
