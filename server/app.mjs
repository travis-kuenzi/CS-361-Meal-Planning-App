import express from 'express';
import path from 'path';
import bcrypt from 'bcrypt';
import {fileURLToPath} from 'url';
import mongoose from 'mongoose';
import {default as credentials} from "./dbCredentials.mjs";
import {default as User } from './models/user.mjs'

// Create an express object
const app = express();

// use json data for app.use methods
app.use(express.json());
// express.urlencoded method
app.use(express.urlencoded({ extended: true }));


// where to find static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '..', 'Public')));

// use ejs as a view engine
app.set('view engine', 'ejs');

// connect to database
const connection_string = credentials.connection_string;
mongoose.connect(connection_string, {}).catch(err => console.log('Error connecting to MongoDB:', err));

// router to login page
app.get("/", (req, res) => {
    res.render("login");
});

// router to signup page
app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/login", (req, res) => {
    res.render("login");
});

// Register User
app.post("/signup", async (req, res) => {

    const data = {
        username: req.body.username,
        password: req.body.password
    }

    const existingUser = await User.findOne({name: data.name});
    if(existingUser) {
        res.send("user already exists. Please choose a different username.")
    } else {
        const userdata = await User.insertMany(data);
        console.log(userdata);
    }

});



// start the app
const port = 3000;
app.listen(port, () => {
    console.log("App listening on port 3000");
});
