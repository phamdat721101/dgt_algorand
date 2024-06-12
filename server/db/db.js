const mongoose = require("mongoose");
require("dotenv").config();

var cors = require("cors");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://0.0.0.0:27017");