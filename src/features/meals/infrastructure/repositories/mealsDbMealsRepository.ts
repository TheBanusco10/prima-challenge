import { MealDetailed } from "../../domain/models/MealDetailed";
import type { MealsRepository } from "../../domain/repositories/mealsRepository";

export class MealsDbMealsRepository implements MealsRepository {
  async getMealsByName(name: string): Promise<MealDetailed[]> {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`,
    );

    const data = await response.json();

    return data.meals?.map((meal: any) => new MealDetailed(meal));
  }
}
