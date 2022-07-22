const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require('knex');

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

//get All Users
app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  const { email, hash, password } = req.body;
  db.select("email","hash")
  .from("login").where("email", "=", email )
  .then(data => {
    const isValid = bcrypt.compareSync(password, data[0].hash);
    if(isValid) {
      db.select("*")
        .from("users")
        .where("email", "=", email)
        .then(user => {
          res.json(user[0])
      }).catch(err => res.status(400).json("Unable to get User"));
    } else {
      res.status(400).json("Wrong credentials !")
    }
  }).catch(err => res.status(400).json("Wrong Credentials"));
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  var hash = bcrypt.hashSync(password);

  db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    }).into("login")
      .returning("email").then(loginEmail => {
        trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0].email,
            name: name,
            joined: new Date()
          })
          .then(user => {
            res.json(user[0])
          }).catch(err => res.status(404).json("Unable to get Email"))
        }).then(trx.commit).catch(trx.rollback)
  }).catch(err => res.status(404).json("Error while registering"))


  

});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({id})
    .then(user => {
      if(user.length)
        res.json(user[0])
      else 
        res.status(400).json("User not found");
    }).catch(err => res.status(400).json("Error getting User"));
});

app.listen(7777, () => {
  console.log("Running");
});

//get ImageCount
app.put("/image", (req, res) => {
  const { id } = req.body;
 db("users")
  .where("id", "=", id)
  .increment("entries", 1)
  .returning("entries")
  .then(entries => {
    if(entries.length)
      res.json(Number(entries[0].entries));
    else
      res.status(400).json("No Entries found")
  }).catch(err => res.status(400).json("Error getting entries"))
});






/* 
Endpoints
----------
/signin - POST -> success/fail 
/register - POST -> user
/profile/:userID - GET - user
/image - PUT -> user

*/
