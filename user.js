const database = require("./database");

const getUsers = async (req, res) => {
    return await database.query("select * from users")
      .then(([users]) => {   
        return res.json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  };

  const getUsersById = async (req, res) => {
    const id = parseInt(req.params.id);
    return await database.query("select * from users where id = ?", [id])
      .then(([users]) => {
        if (users[0] != null) {
          return res.json(users[0]);
        } else {
          res.status(404).send("Not Found");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  };

  const postUser = (req, res) => {
    const { firstname, lastname, email, city, language } = req.body;
    database
      .query(
        "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
        [firstname, lastname, email, city, language]
      )
      .then(([result]) => {
        res.location(`/api/users/${result.insertId}`).sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error saving the movie");
      });
  };
  

  module.exports = {getUsers, getUsersById, postUser};