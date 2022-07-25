const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: '2fa81f0840ad467ba9df30d0494e228f'
});

const handleApiCall = (req, res) => {
  app.models.predict(
    Clarifai.FACE_DETECT_MODEL, 
    req.body.input
    ).then(data => res.json(data))
     .catch(err => res.status(400).json("Unable to work with API"))
}


const handleImage = (req, res, db) => {
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
}

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall
}
