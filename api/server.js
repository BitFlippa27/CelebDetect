const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require('knex');
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port: 5432,
    user : 'delean',
    password : '',
    
    database : 'proposo'
  }
});

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => { res.send("Its working !")});

app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt) }); //Dependency Injection

app.post("/signin", (req, res) => { signin.handleSignIn(req, res, db, bcrypt) });

app.get("/profile/:id", (req, res) => { profile.handleProfile(req, res, db) });

app.listen(process.env.PORT || 7777, () => { console.log(`Running on Port ${process.env.PORT}`) });
//get ImageCount
app.put("/image", (req, res) => { image.handleImage(req, res, db) });
app.post("/imageurl", (req, res) => { image.handleApiCall(req, res) });



/* 
Endpoints
----------
/signin - POST -> success/fail 
/register - POST -> user
/profile/:userID - GET - user
/image - PUT -> user

*/
