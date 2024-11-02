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


// Register User
app.post("/signup", async (req, res) => {

    const data = {
        username: req.body.username,
        password: req.body.password
    }

    const existingUser = await User.findOne({name: data.username});
    if(existingUser) {
        res.send("user already exists. Please choose a different username.")
    } else {
        // hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword;
        const userdata = await User.insertMany(data);
        console.log(userdata);
    }

});

// Login User
app.post("/login", async (req, res) => {
    try {
        const check = await User.findOne({username: req.body.username});
        if (!check) {
            res.send("User name cannot be found");
        }

        // compare the hash password from the database with the plain text
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (isPasswordMatch) {
            res.render("home");
        } else {
            res.send("wrong password");
        }
    } catch {
        res.send("Wrong Details");
    }
});



// start the app
const port = 3000;
app.listen(port, () => {
    console.log("App listening on port 3000");
});
