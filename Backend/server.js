require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/DBConnect");
const errorHandler = require("./middleware/errorMiddleware");
const adminRoute = require("./routes/adminRoute");
const roomRoute = require("./routes/roomRoute");

const PORT = process.env.PORT || 3500;

app.use(express.json()); // It is used to parse the body of HTTP requests and make the JSON data available on req.body.
app.use(express.urlencoded({ extended: false })); // makes it easy to parse URL-encoded data from the request body, commonly used for form submissions.
app.use(cookieParser()); // Cookie-parser makes it easy to read cookies sent by the client.It populates the req.cookies object with cookies sent by the client, making it easier to access them in your application.
app.use(bodyParser.json()); // This allows you to easily access JSON data sent in the request body.

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});


app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true, //  allow the server to accept requests or Enable the sending of credentials (cookies, authorization headers, etc.)
    optionsSuccessStatus: 200,
    methods: "GET ,POST, PATCH, DELETE, HEAD, OPTIONS",
  })
);

app.get("/", (req, res) => {
  res.send("Hello Bossman!!!");
});

app.use("/admin", adminRoute);
connectDB();

app.use("/room", roomRoute);

app.use(errorHandler);
mongoose.connection.once("open", () => {
  console.log("Database connected!");
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
});
