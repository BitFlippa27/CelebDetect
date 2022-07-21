const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const app = express();


app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());


const database = {
  users: [
    {  
      id: "1",
      name: "John",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date()
    }, 
    {
      id: "2",
      name: "Sally",
      email: "Sally@gmail.com",
      password: "bananas ",
      entries: 0,
      joined: new Date()
    }
   
  ]
}
//get All Users
app.get("/", (req, res) => {
  res.send(database.users);
})

app.post("/signin", (req, res) => {
  /*Ü
  bcrypt.compare(req.body.password, "$2a$10$dw7rW4Vtd1uA4BmwAKhdjuM8PxgTHFsg9ZQYEcMUyPwvk1S8TdCvS", function(err, res) {
    console.log("first guess", res)
  });
  bcrypt.compare("veggies", "$2a$10$dw7rW4Vtd1uA4BmwAKhdjuM8PxgTHFsg9ZQYEcMUyPwvk1S8TdCvS", function(err, res) {
    console.log("second guess", res)
  });
  */

  if(req.body.email === database.users[0].email && req.body.password === database.users[0].password ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json("Error logging in");
  }
})

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password, null, null, function(err, hash) {
    console.log(hash);
  });

  //dont return password
  database.users.push({
    id: "125",
    name: name,
    email: email,
    entries: 0,
    joined: new Date()
  });

  res.json(database.users[database.users.length -1]);

});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if(user.id === id) {
      found = true;
      return res.json(user);
    } 
  })
  if(!found)
   res.status(404).json("no Such User");
})

app.listen(7777, () => {
  console.log("Running");
})

//get ImageCount
app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if(user.id === id) {
      found = true;
      user.entries++;

      return res.json(user.entries);
    } 
  })
  if(!found)
   res.status(404).json("no Such User");
})






/* 
Endpoints
----------
/signin - POST -> success/fail 
/register - POST -> user
/profile/:userID - GET - user
/image - PUT -> user

*/
