import { faker } from "@faker-js/faker";
import { ICreateAuthorDTO } from "@modules/author/dtos/ICreateAuthorDTO";
import { AuthorRepositoryInMemory } from "@modules/author/repositories/in-Memory/AuthorRepositoryInMemory";
import { EmailRepositoryInMemory } from "@modules/author/repositories/in-Memory/EmailRepositoryInMemory";
import { IngredientRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/IngredientRepositoryInMemory";
import { ProdutoRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/ProdutoRepositoryInMemory";
import { RecipeRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/RecipeRepositoryInMemory";
import { CreateIngredientUseCase } from "@modules/recipe/useCases/createIngredient/CreateIngredientUseCase";
import { CreateRecipeUseCase } from "@modules/recipe/useCases/createRecipe/CreateRecipeUseCase";

import { AppError } from "@shared/errors/AppError";

import { CreateAuthorUseCase } from "../createAuthor/CreateAuthorUseCase";
import { CreateEmailUseCase } from "../createEmail/CreateEmailUseCase";
import { DeleteAuthorUseCase } from "./DeleteAuthorUseCase";

let produtoRepositoryInMemory: ProdutoRepositoryInMemory;
let ingredientRepositoryInMemory: IngredientRepositoryInMemory;
let emailRepositoryInMemory: EmailRepositoryInMemory;
let recipeRepositoryInMemory: RecipeRepositoryInMemory;
let authorRepositoryInMemory: AuthorRepositoryInMemory;
let createAuthorUseCase: CreateAuthorUseCase;
let createEmailUseCase: CreateEmailUseCase;
let createRecipeUseCase: CreateRecipeUseCase;
let createIngredientUseCase: CreateIngredientUseCase;
let deleteAuthorUseCase: DeleteAuthorUseCase;

describe("Delete author UseCase", () => {
    beforeEach(() => {
        produtoRepositoryInMemory = new ProdutoRepositoryInMemory();
        ingredientRepositoryInMemory = new IngredientRepositoryInMemory();
        emailRepositoryInMemory = new EmailRepositoryInMemory();
        recipeRepositoryInMemory = new RecipeRepositoryInMemory();
        authorRepositoryInMemory = new AuthorRepositoryInMemory();
        createAuthorUseCase = new CreateAuthorUseCase(authorRepositoryInMemory);
        createEmailUseCase = new CreateEmailUseCase(
            emailRepositoryInMemory,
            authorRepositoryInMemory
        );
        createIngredientUseCase = new CreateIngredientUseCase(
            ingredientRepositoryInMemory,
            produtoRepositoryInMemory
        );
        createRecipeUseCase = new CreateRecipeUseCase(
            recipeRepositoryInMemory,
            ingredientRepositoryInMemory,
            authorRepositoryInMemory
        );
        deleteAuthorUseCase = new DeleteAuthorUseCase(authorRepositoryInMemory);
    });

    it("should be able to delete author using name", async () => {
        const author: ICreateAuthorDTO = {
            id: faker.datatype.uuid(),
            name: faker.name.fullName(),
            whatsapp: faker.phone.number(),
        };

        const authorCreated = await createAuthorUseCase.execute(author);

        const deleteAuthor = await deleteAuthorUseCase.execute(
            authorCreated.name
        );

        expect(deleteAuthor).toBe(null);
    });

    it("should not be able to delete author using name invalid", async () => {
        const name = "fake-name";

        await expect(deleteAuthorUseCase.execute(name)).rejects.toEqual(
            new AppError("Author not found", 404)
        );
    });
});
