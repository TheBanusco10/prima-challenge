import { useState } from "react";
import { GetAllCategoriesUseCase } from "../application/use-cases/getAllCategoriesUseCase";
import { MealDbRecipesRepository } from "../infrastructure/repositories/mealDbRecipesRepository";
import type { Category } from "../domain/models/Category";
import { GetRecipesByCategoryUseCase } from "../application/use-cases/getRecipesByCategoryUseCase";
import type { MealPreview } from "@/features/meals/domain/models/MealPreview";

const recipeRepository = new MealDbRecipesRepository();
const getAllCategoriesUseCase = new GetAllCategoriesUseCase(recipeRepository);
const getRecipesByCategoryUseCase = new GetRecipesByCategoryUseCase(
  recipeRepository,
);

export default () => {
  const [recipesByCategory, setRecipesByCategory] = useState<MealPreview[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [fetching, setFetching] = useState(false);

  const getAllCategories = async () => {
    setFetching(true);
    const categories = await getAllCategoriesUseCase.execute();
    setAllCategories(categories);
    setFetching(false);
  };

  const getRecipesByCategory = async (category: string) => {
    const recipes = await getRecipesByCategoryUseCase.execute(category);

    setRecipesByCategory(recipes);

    return recipes;
  };

  return {
    allCategories,
    fetching,
    recipesByCategory,
    getAllCategories,
    getRecipesByCategory,
  };
};
