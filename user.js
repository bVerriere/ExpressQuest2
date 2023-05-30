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

  const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { firstname, lastname, email, city, language } = req.body;
    database
      .query(
        "UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ? WHERE id = ?",
        [firstname, lastname, email, city, language, id]
      )
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.status(404).send("Not Found");
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error editing the user");
      });
  };

  const validateUser = (req, res, next) => {
    const { email } = req.body;
    const errors = [];
  
    if (email == null) {
      errors.push({ field: "email", message: "This field is required" });
    } else if (title.length >= 255) {
      errors.push({ field: "email", message: "Should contain less than 255 characters" });
    }
  
    const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;
  
    if (!emailRegex.test(email)) {
      errors.push({ field: 'email', message: 'Invalid email' });
    }
  
    // ...
  
    if (errors.length) {
      res.status(422).json({ validationErrors: errors });
    } else {
      next();
    }
  };
  

  module.exports = {getUsers, getUsersById, postUser, updateUser, validateUser};