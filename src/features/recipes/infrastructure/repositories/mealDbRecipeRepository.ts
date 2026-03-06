import { Area } from "../../domain/models/Area";
import { Category } from "../../domain/models/Category";
import type { RecipeRepository } from "../../domain/repositories/recipeRepository";

export class MealDbRecipeRepository implements RecipeRepository {
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
}
