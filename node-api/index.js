const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require("cors");

require("dotenv").config();
require('./config/db')

// Connect Database
mongoose.Promise = global.Promise;

// Node Port
const port = process.env.PORT || 5000;

app.use(cors({ origin: "*", credentials: true }));

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "100mb" }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
});

// Base Route
app.get("/", (req, res) => {
    console.log("success");
    res.send(`Api running .... connected db : ${process.env.MONGO_HOST}`)
});
app.get("/cancel", (req, res) => {
    console.log("cancel");
    res.send(`Api running .... cancelled`)
});
app.get("/success", (req, res) => {
    console.log("success");
    res.send(`Api running .... success`)
});

app.use(async (error, req, res, next) => {
    res.status(error.status || 500);
    if (error.status) {
        return res.json({
            message: error.message,
        });
    }
    return res.json({
        message: "Internal Server Error",
        error: error.message,
    });
});

app.listen(port, () => {
    console.log('Server started at : ' + port)
});