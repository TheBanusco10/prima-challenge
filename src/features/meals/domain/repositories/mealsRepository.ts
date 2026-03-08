import type { MealDetailed } from "../models/MealDetailed";

export interface MealsRepository {
  // getMealById(id: string): Promise<MealDetailed>;
  getMealsByName(name: string): Promise<MealDetailed[]>;
}
