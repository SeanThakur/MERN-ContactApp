const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require('mongoose');
const passport = require("passport");

//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/project';
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("mongodb database connected.");
}).catch((error) => {
    console.log(`Error while connected to mongodb server: ${error}`);
});

const app = express();

//morgan middelware
app.use(morgan("dev"));

//bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//Authentication passport module initialization middleware
app.use(passport.initialize());

//config file for passport stratagy for jwt token
require("./config/passport")(passport);

//routing links
const post = require("./routes/posts");
const user = require("./routes/user");

app.use("/contact", post);
app.use("/", user);

//Listening Port 
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});