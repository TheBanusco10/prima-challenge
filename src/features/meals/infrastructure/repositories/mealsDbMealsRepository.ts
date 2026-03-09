import { MealDetailed } from "../../domain/models/MealDetailed";
import type { MealsRepository } from "../../domain/repositories/mealsRepository";
import { MealsApiError } from "../errors/MealsApiError";
import type { MealApiDto } from "../types/mealApiDto";

export class MealsDbMealsRepository implements MealsRepository {
  async getMealsByName(name: string): Promise<MealDetailed[]> {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`,
      );

      if (!response.ok) {
        throw new MealsApiError(`Error fetching API: ${response.status}`);
      }

      const data = await response.json();

      return (
        data.meals?.map((meal: MealApiDto) => new MealDetailed(meal)) ?? []
      );
    } catch (err) {
      throw new MealsApiError("Failed to fetch meals");
    }
  }
}
