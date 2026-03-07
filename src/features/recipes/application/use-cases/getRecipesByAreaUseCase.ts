import type { RecipesRepository } from "../../domain/repositories/recipesRepository";

export class GetRecipesByAreaUseCase {
  private readonly recipeRepository: RecipesRepository;

  constructor(recipeRepository: RecipesRepository) {
    this.recipeRepository = recipeRepository;
  }

  async execute(area: string) {
    return this.recipeRepository.getRecipesByArea(area);
  }
}
