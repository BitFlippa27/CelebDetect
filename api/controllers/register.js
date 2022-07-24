const handleRegister = (req, res, db, bcrypt) => {
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
}


module.exports = {
  handleRegister: handleRegister
}