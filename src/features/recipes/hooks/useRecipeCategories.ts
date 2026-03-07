import { useState } from "react";
import { GetAllCategoriesUseCase } from "../application/use-cases/getAllCategoriesUseCase";
import { MealDbRecipeRepository } from "../infrastructure/repositories/mealDbRecipeRepository";
import type { Category } from "../domain/models/Category";
import { GetRecipesByCategoryUseCase } from "../application/use-cases/getRecipesByCategoryUseCase";

export default () => {
  const recipeRepository = new MealDbRecipeRepository();
  const getAllCategoriesUseCase = new GetAllCategoriesUseCase(recipeRepository);
  const getRecipesByCategoryUseCase = new GetRecipesByCategoryUseCase(
    recipeRepository,
  );

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
    return recipes;
  };

  return {
    allCategories,
    fetching,
    getAllCategories,
    getRecipesByCategory,
  };
};
