const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.APP_PORT ?? 5001;

const movieHandlers = require("./movieHandlers");
const user = require("./user");

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

const { validateMovie, validateUser } = require("./validators.js");

app.use(express.json());
app.get("/", welcome);
app.get("/api/movies", validateMovie, movieHandlers.getMovies);
app.get("/api/movies/:id", validateMovie, movieHandlers.getMovieById);
app.get("/api/users", user.getUsers);
app.get("/api/users/:id", user.getUsersById);

app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.post("/api/users", validateUser, user.postUser);

app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);
app.put("/api/users/:id", validateUser, user.updateUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});