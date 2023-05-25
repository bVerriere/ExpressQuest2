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

  module.exports = {getUsers, getUsersById};