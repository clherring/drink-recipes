//Dependencies
const express = require("express");
const recipes = require("./drinks.js");
const addDrinkValidator = require("./drinkValidator.js");

//configure express server
const app = express();

// middleware
app.use(express.json());

// setup port
const port = process.env.PORT || 6000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", async (req, res) => {
  await res.send("Saving my recipes");
});

app.get("/drinks", async (req, res) => {
  await res.send(drinks);
});

app.get("/drinks/:id", async (req, res) => {
  const drink = await drinks.find((r) => r.id === parseInt(req.params.id));
  if (!drink)
    return res.status(404).send("The drink with given id is not found");
  res.send(drink);
});

app.get("/ingredients/:spirit", async (req, res) => {
  const drink = await drinks.filter(
    (r) => r.spirit.toLowerCase() == req.params.spirit.toLowerCase()
  );
  if (!drink) return res.status(404).send("This spirit is not listed");
  res.send(drink);
});

app.post("/drinks", async (req, res) => {
  const { error } = await addDrinkValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const drink = {
    id: recipes.length + 1,
    spirit: req.body.spirit,
    cocktail: req.body.cocktail,
    recipe: req.body.recipe,
  };
  recipes.push(drink);
  res.send(drink);
});

app.put("/drinks/:id", async (req, res) => {
  const drink = await recipes.find((r) => r.id === parseInt(req.params.id));
  if (!drink)
    return res.status(404).send("The drink with given id is not found");

  const { error } = addDrinkValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  drink.spirit = req.body.spirit;
  drink.recipe = req.body.recipe;
  drink.cocktail = req.body.cocktail;
  res.send(drink);
});

app.delete("/drinks/:id", async (req, res) => {
  const drink = await recipes.find((r) => r.id === parseInt(req.params.id));
  if (!drink)
    return res.status(404).send("The drink with given id is not found");

  const index = recipes.indexOf(drink);
  recipes.splice(index, 1);

  res.send(drink);
});
