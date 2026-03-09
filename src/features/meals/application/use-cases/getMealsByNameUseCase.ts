import { InvalidMealsNameLengthError } from "../../domain/errors/InvalidMealsNameLengthError";
import type { MealsRepository } from "../../domain/repositories/mealsRepository";

export class GetMealsByNameUseCase {
  private readonly mealsRepository: MealsRepository;

  constructor(mealsRepository: MealsRepository) {
    this.mealsRepository = mealsRepository;
  }

  async execute(name: string) {
    if (name.length < 3) {
      throw new InvalidMealsNameLengthError();
    }

    return this.mealsRepository.getMealsByName(name);
  }
}
