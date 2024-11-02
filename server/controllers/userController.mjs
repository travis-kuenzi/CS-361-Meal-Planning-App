import {default as User} from "../models/user.mjs";
import {default as mongoose} from "mongoose";
import bcrypt from 'bcrypt';


// Register User
async function login(req, res, next) {
    try {
        res.render("login.ejs");
    } catch (err) {
        console.error('Error in genreList:', err);
    }
    
};

async function signup(req, res, next) {
    res.render("signup.ejs");
}

async function createUser(req, res, next) {
    const data = {
        email: req.body.email,
        password: req.body.password
    }

    const existingUser = await User.findOne({email: data.email});
    if(existingUser) {
        res.send("user already exists. Please choose a different email.")
    } else {
        // hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword;
        const userdata = await User.insertMany(data);
        console.log(userdata);

        res.redirect("home.html");
    }
};

async function loginUser(req, res, next) {
    try {
        const check = await User.findOne({email: req.body.email});
        if (!check) {
            res.send("Email cannot be found");
        }

        // compare the hash password from the database with the plain text
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (isPasswordMatch) {
            res.redirect("home.html");
        } else {
            res.send("wrong password");
        }
    } catch {
        res.send("Wrong Details");
    }   
};

export {login, signup, createUser, loginUser};