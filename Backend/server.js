require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3500;

app.get("/", (req, res) => {
    res.send("Hello Bossman!!!");
})

app.listen(PORT, () => console.log `server running on port ${PORT}`)