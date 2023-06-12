const Joi = require("joi");

const movieSchema = Joi.object({
  title: Joi.string().max(255).required(),
  director: Joi.string().max(255).required(),
  year: Joi.number().integer().required(),
  color: Joi.string().max(255).required(),
  duration: Joi.number().integer().required(),
});

const validateMovie = (req, res, next) => {
  const { error } = movieSchema.validate(req.body);

  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.context.key,
      message: detail.message,
    }));
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

const userSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
  firstname: Joi.string().max(255).required(),
  lastname: Joi.string().max(255).required(),
  city: Joi.string().max(255),
  language: Joi.string().max(255),
});

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.context.key,
      message: detail.message,
    }));
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

module.exports = { validateUser, validateMovie }