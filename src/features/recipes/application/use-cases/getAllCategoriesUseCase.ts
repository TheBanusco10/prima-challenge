import type { RecipeRepository } from "../../domain/repositories/recipeRepository";

export class GetAllCategoriesUseCase {
  private readonly recipeRepository: RecipeRepository;

  constructor(recipeRepository: RecipeRepository) {
    this.recipeRepository = recipeRepository;
  }

  async execute() {
    return this.recipeRepository.getAllCategories();
  }
}
