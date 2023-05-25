const database = require("./database");

const getMovies = async (req, res) => {
  return await database.query("select * from movies")
    .then(([movies]) => {   
      return res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getMovieById = async (req, res) => {
  const id = parseInt(req.params.id);
  return await database.query("select * from movies where id = ?", [id])
    .then(([movies]) => {
      if (movies[0] != null) {
        return res.json(movies[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

module.exports = {
  getMovies,
  getMovieById
};