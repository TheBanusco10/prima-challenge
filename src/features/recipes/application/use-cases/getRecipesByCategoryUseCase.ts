import type { RecipesRepository } from "../../domain/repositories/recipesRepository";

export class GetRecipesByCategoryUseCase {
  private readonly recipeRepository: RecipesRepository;

  constructor(recipeRepository: RecipesRepository) {
    this.recipeRepository = recipeRepository;
  }

  async execute(category: string) {
    return this.recipeRepository.getRecipesByCategory(category);
  }
}
