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
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", user.getUsers);
app.get("/api/users/:id", user.getUsersById);

app.post("/api/movies", validateMovie, movieHandlers.postMovie);
// app.post("/api/users", validateUser, user.postUser);

app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);
// app.put("/api/users/:id", validateUser, user.updateUser);

app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.delete("/api/users/:id", user.deleteUser);

const { hashPassword } = require("./auth.js");

app.post("/api/users", hashPassword, user.postUser);
app.put("/api/users/:id", hashPassword, user.updateUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

