const database = require("./database");

const getMovies = async (req, res) => {
  try {
    const [movies] = await database.query("SELECT * FROM movies");
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving data from the database");
  }
};

const getMovieById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [movies] = await database.query("SELECT * FROM movies WHERE id = ?", [id]);
    if (movies[0] != null) {
      res.json(movies[0]);
    } else {
      res.status(404).send("Not Found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving data from the database");
  }
};

const postMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body;
  database
    .query(
      "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
      [title, director, year, color, duration]
    )
    .then(([result]) => {
      res.location(`/api/movies/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the movie");
    });
};

module.exports = {
  getMovies,
  getMovieById,
  postMovie
};
