const express = require('express');
const app = express();
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const mongoose = require("mongoose");

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL);
const conn = mongoose.connection;
conn.once("open", () => {
    console.log("succesfully connected to database");
})
conn.on("error", () => {
    console.log("Failed to connect to database");
})


// route
app.get("/", (req, res) => {
    res.send("this is my first restful api");
})

require("./routes/resturantroute")(app);

const PORT = process.env.PORT;
// maximum value given can be 0-65535
app.listen(PORT, (req, res) => {
    console.log("port started")
})