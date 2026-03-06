import type { Area } from "../models/Area";
import type { Category } from "../models/Category";

export interface RecipeRepository {
  getAllAreas(): Promise<Area[]>;
  getAllCategories(): Promise<Category[]>;
}
