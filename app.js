require('dotenv').config();
const express = require("express");
const bp = require("body-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.json());

const dbURL =  process.env.MONGO_URL; 

mongoose.connect(dbURL,{useNewUrlParser:true, useUnifiedTopology:true},
    () => {
        console.log('Connected to MongoDB');
      }
);

mongoose.set("strictQuery", true);



















app.route("/login")
    .get(function (req, res) {
        res.render("login");
    })


    .post(async (req, res) => {

        const {email, password} = req.body;

        try {

            const user =  await User.create({email,password});
            res.status(201).json(user);

        } catch (err) {
            
            console.log(err);
            res.status(400).send("error ");

        }


        res.send("hello");
    })
    
;

app.get("/signup", function (req, res) {
    res.render("signup");
})

app.get("/home", function (req, res) {
    res.render("home");
})





app.listen(3000, function() {
    console.log("server started on port 3000");
});
    

