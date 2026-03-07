import type { Area } from "../models/Area";
import type { Category } from "../models/Category";
import type { MealPreview } from "../models/MealPreview";

export interface RecipesRepository {
  getAllAreas(): Promise<Area[]>;
  getAllCategories(): Promise<Category[]>;
  getRecipesByArea(area: string): Promise<MealPreview[]>;
  getRecipesByCategory(category: string): Promise<MealPreview[]>;
}
