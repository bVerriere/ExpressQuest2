const database = require("./database");
let sql = "SELECT * FROM users";
const sqlValues = [];
const { hashPassword } = require("./auth");

const getUsers = async (req, res) => {
  if (req.query.language != null) {
    sql += " WHERE language = ?";
    sqlValues.push(req.query.language);
    if (req.query.city != null) {
      sql += " AND city = ?";
      sqlValues.push(req.query.city);
    }
  }
  try {
    const [users] = await database.query(sql, sqlValues);
    return res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving data from database");
  }
};

const getUsersById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const [users] = await database.query("SELECT * FROM users WHERE id = ?", [id]);
    if (users[0] != null) {
      return res.json(users[0]);
    } else {
      res.status(404).send("Not Found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving data from database");
  }
};

const postUser = async (req, res) => {
  const { firstname, lastname, email, city, language, hashedPassword } = req.body;
  try {
    // Utilisez hashedPassword dans votre requête pour insérer le nouvel utilisateur avec le mot de passe hashé
    const [result] = await database.query(
      "INSERT INTO users (firstname, lastname, email, city, language, hashedPassword) VALUES (?, ?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language, hashedPassword]
    );
    const newUserId = result.insertId;
    const newUser = { id: newUserId, firstname, lastname, email, city, language, hashedPassword };
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving the user");
  }
};

const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language, hashedPassword } = req.body;
  try {
    // Utilisez hashedPassword dans votre requête pour mettre à jour l'utilisateur avec le mot de passe hashé
    await database.query(
      "UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ?, hashedPassword = ? WHERE id = ?",
      [firstname, lastname, email, city, language, hashedPassword, id]
    );
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error editing the user");
  }
};

const validateUser = (req, res, next) => {
  const { email } = req.body;
  const errors = [];

  if (email == null) {
    errors.push({ field: "email", message: "This field is required" });
  } else if (email.length >= 255) {
    errors.push({ field: "email", message: "Should contain less than 255 characters" });
  }

  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;

  if (!emailRegex.test(email)) {
    errors.push({ field: "email", message: "Invalid email" });
  }

  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query("DELETE FROM users WHERE id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting the user");
    });
};

module.exports = { getUsers, getUsersById, postUser, updateUser, validateUser, deleteUser };
