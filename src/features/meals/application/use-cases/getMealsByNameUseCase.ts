import type { MealsRepository } from "../../domain/repositories/mealsRepository";

export class GetMealsByNameUseCase {
  private readonly mealsRepository: MealsRepository;

  constructor(mealsRepository: MealsRepository) {
    this.mealsRepository = mealsRepository;
  }

  async execute(name: string) {
    return this.mealsRepository.getMealsByName(name);
  }
}
