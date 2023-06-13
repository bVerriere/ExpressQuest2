const argon2 = require("argon2");

const hashingOptions = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 5,
    parallelism: 1,
};

const hashPassword = (req, res, next) => {
    console.log(req.body);
    argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword) => {
        req.body.hashedPassword = hashedPassword;
        delete req.body.password;
        next();
    })
    .catch ((error) => {
    console.error("Error hashing password:", error);
    res.status(500).json({ message: "Internal server error" });
  });
};

module.exports = { hashPassword };
