const express = require("express");

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());


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
      password: "cookies",
      entries: 0,
      joined: new Date()
    }
   
  ]
}

app.get("/", (req, res) => {
  res.send(database.users);
})

app.post("/signin", (req, res) => {
  if(req.body.email === database.users[0].email && req.body.password === database.users[1].password ) {
    res.json("Success");
  } else {
    res.status(400).json("Error logging in");
  }
})

app.post("/register", (req, res) => {
  
  const { email, name, password } = req.body;
  database.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
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

/* 
Endpoints
----------
/signin - POST -> success/fail 
/register - POST -> user
/profile/:userID - GET - user
/image - PUT -> user

*/
