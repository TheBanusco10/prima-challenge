import { Area } from "../../domain/models/Area";
import { Category } from "../../domain/models/Category";
import { MealPreview } from "@/features/meals/domain/models/MealPreview";
import type { RecipesRepository } from "../../domain/repositories/recipesRepository";

export class MealDbRecipesRepository implements RecipesRepository {
  async getAllAreas() {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list",
    );

    const data = await response.json();

    return data.meals?.map((area: any) => new Area(area));
  }

  async getAllCategories() {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php",
    );

    const data = await response.json();

    return data.categories?.map((category: any) => new Category(category));
  }

  async getRecipesByArea(area: string) {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`,
    );

    const data = await response.json();

    return data.meals?.map((meal: any) => new MealPreview(meal));
  }

  async getRecipesByCategory(category: string) {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
    );

    const data = await response.json();

    return data.meals?.map((meal: any) => new MealPreview(meal));
  }
}
