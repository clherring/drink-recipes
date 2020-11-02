const Joi = require("joi");

const addDrinkValidator = (drink) => {
  const schema = Joi.object({
    id: Joi.number(),
    spirit: Joi.string().required(),
    cocktail: Joi.string(),
    recipe: Joi.string(),
  });

  const { error } = schema.validate(drink.body);
  if (error) return res.status(400).send(error.details[0].message);

  return schema.validate(drink);
};

module.exports = addDrinkValidator;
