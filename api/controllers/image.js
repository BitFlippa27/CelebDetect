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
  handleImage: handleImage
}
