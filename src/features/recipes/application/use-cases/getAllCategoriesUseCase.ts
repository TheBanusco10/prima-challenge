import type { RecipesRepository } from "../../domain/repositories/recipesRepository";

export class GetAllCategoriesUseCase {
  private readonly recipeRepository: RecipesRepository;

  constructor(recipeRepository: RecipesRepository) {
    this.recipeRepository = recipeRepository;
  }

  async execute() {
    return this.recipeRepository.getAllCategories();
  }
}
