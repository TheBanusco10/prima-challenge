import { useState } from "react";
import { GetAllCategoriesUseCase } from "../application/use-cases/getAllCategoriesUseCase";
import { MealDbRecipeRepository } from "../infrastructure/repositories/mealDbRecipeRepository";
import type { Category } from "../domain/models/Category";

export default () => {
  const getAllCategoriesUseCase = new GetAllCategoriesUseCase(
    new MealDbRecipeRepository(),
  );

  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [fetching, setFetching] = useState(false);

  const getAllCategories = async () => {
    setFetching(true);
    const categories = await getAllCategoriesUseCase.execute();
    setAllCategories(categories);
    setFetching(false);
  };

  return {
    allCategories,
    fetching,
    getAllCategories,
  };
};
