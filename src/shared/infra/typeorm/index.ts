import { Author } from "@modules/author/infra/typeorm/entities/Author";
import { Email } from "@modules/author/infra/typeorm/entities/Email";
import { Ingredient } from "@modules/recipe/infra/typeorm/entities/Ingredient";
import { Recipe } from "@modules/recipe/infra/typeorm/entities/Recipe";
import { DataSource } from "typeorm";

import { CreateRecipe1660942928513 } from "./migrations/1660942928513-CreateRecipe";
import { CreateIngredient1661028123973 } from "./migrations/1661028123973-CreateIngredient";
import { CreateRecipesIngredients1661042649597 } from "./migrations/1661042649597-CreateRecipesIngredients";
import { AlterAnimalColorIsNullAbleTrue1661049819867 } from "./migrations/1661049819867-AlterAnimalColorIsNullAbleTrue";
import { AlterRecipeRemoveIngredient1661092158623 } from "./migrations/1661092158623-AlterRecipeRemoveIngredient";
import { CreateEmail1661287166449 } from "./migrations/1661287166449-CreateEmail";
import { AlterEmailAddAuthorName1661383278848 } from "./migrations/1661383278848-AlterEmailAddAuthorName";
import { AlterRecipeChangeAuthorForAuthorName1661385979738 } from "./migrations/1661385979738-AlterRecipeChangeAuthorForAuthorName";
import { CreateAuthor1661395822193 } from "./migrations/1661395822193-CreateAuthor";

const dataSource = new DataSource({
  type: "postgres",
  port: 5432,
  username: "docker",
  password: "receitasecreta",
  database:
    process.env.NODE_ENV === "test"
      ? "culinary_recipes_test"
      : "culinary_recipes",

  // importar entidades ex: [Recipes]
  entities: [Recipe, Ingredient, Email, Author],
  // importar migrations ex: [CreateRecipes102348998]
  migrations: [
    CreateRecipe1660942928513,
    CreateIngredient1661028123973,
    CreateRecipesIngredients1661042649597,
    AlterAnimalColorIsNullAbleTrue1661049819867,
    AlterRecipeRemoveIngredient1661092158623,
    CreateEmail1661287166449,
    AlterEmailAddAuthorName1661383278848,
    AlterRecipeChangeAuthorForAuthorName1661385979738,
    CreateAuthor1661395822193,
  ],
});

export function createConnection(host = "localhost"): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize();
}

export default dataSource;
