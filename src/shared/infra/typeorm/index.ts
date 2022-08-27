import { Author } from "@modules/author/infra/typeorm/entities/Author";
import { Email } from "@modules/author/infra/typeorm/entities/Email";
import { Ingredient } from "@modules/recipe/infra/typeorm/entities/Ingredient";
import { Produto } from "@modules/recipe/infra/typeorm/entities/Produto";
import { Recipe } from "@modules/recipe/infra/typeorm/entities/Recipe";
import { DataSource } from "typeorm";

import { CreateRecipe1660942928513 } from "./migrations/1660942928513-CreateRecipe";
import { CreateIngredient1661028123973 } from "./migrations/1661028123973-CreateIngredient";
import { CreateRecipesIngredients1661042649597 } from "./migrations/1661042649597-CreateRecipesIngredients";
import { AlterRecipeRemoveIngredient1661092158623 } from "./migrations/1661092158623-AlterRecipeRemoveIngredient";
import { CreateEmail1661287166449 } from "./migrations/1661287166449-CreateEmail";
import { AlterRecipeChangeAuthorForAuthorName1661385979738 } from "./migrations/1661385979738-AlterRecipeChangeAuthorForAuthorName";
import { CreateAuthor1661395822193 } from "./migrations/1661395822193-CreateAuthor";
import { CreateProduto1661479247977 } from "./migrations/1661479247977-CreateProduto";
import { AlterIngredientsAddFKProdutos1661550373729 } from "./migrations/1661550373729-AlterIngredientsAddFKProdutos";
import { AlterRecipeAddFKAuthor1661567666428 } from "./migrations/1661567666428-AlterRecipeAddFKAuthor";

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
  entities: [Recipe, Produto, Ingredient, Email, Author],
  // importar migrations ex: [CreateRecipes102348998]
  migrations: [
    CreateRecipe1660942928513,
    CreateProduto1661479247977,
    CreateIngredient1661028123973,
    CreateRecipesIngredients1661042649597,
    AlterRecipeRemoveIngredient1661092158623,
    CreateEmail1661287166449,
    AlterRecipeChangeAuthorForAuthorName1661385979738,
    CreateAuthor1661395822193,
    AlterIngredientsAddFKProdutos1661550373729,
  ],
});

export function createConnection(host = "localhost"): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize();
}

export default dataSource;
