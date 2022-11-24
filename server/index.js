const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
const login = require("./routes/login")
const secrete = "pankaj@98+27*3"

const app = express();

mongoose.connect('mongodb://0.0.0.0/xhipment ', (e) => {
   (e) ? console.log(e.message) : console.log("mongoose is connected")
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/" , login)


app.listen(8080, (e) => {
   (e) ? console.log(e.message) : console.log("server is up at 8080")
})

