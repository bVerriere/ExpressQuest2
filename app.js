const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.APP_PORT ?? 5001;

const movieHandlers = require("./movieHandlers");
const user = require("./user");

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.use(express.json());
app.get("/", welcome);
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", user.getUsers);
app.get("/api/users/:id", user.getUsersById);

app.post("/api/movies", movieHandlers.postMovie);
app.post("/api/users", user.postUser);

app.put("/api/movies/:id", movieHandlers.updateMovie);
app.put("/api/users/:id", user.updateUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
