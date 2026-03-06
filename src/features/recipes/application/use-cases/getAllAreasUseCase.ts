import type { RecipeRepository } from "../../domain/repositories/recipeRepository";

export class GetAllAreasUseCase {
  private readonly recipeRepository: RecipeRepository;

  constructor(recipeRepository: RecipeRepository) {
    this.recipeRepository = recipeRepository;
  }

  async execute() {
    return this.recipeRepository.getAllAreas();
  }
}
