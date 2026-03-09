import { useState } from "react";
import { GetMealsByNameUseCase } from "../application/use-cases/getMealsByNameUseCase";
import { MealsDbMealsRepository } from "../infrastructure/repositories/mealsDbMealsRepository";
import type { MealDetailed } from "../domain/models/MealDetailed";
import type { CoreError } from "@/features/core/domain/errors/CoreError";

const mealsRepository = new MealsDbMealsRepository();
const getMealsByNameUseCase = new GetMealsByNameUseCase(mealsRepository);

export default (mealsToShow: number = 5) => {
  const [searchedMeals, setSearchedMeals] = useState<MealDetailed[] | null>(
    null,
  );
  const [isFetching, setIsFeching] = useState(false);

  const getMealsByName = async (name: string) => {
    try {
      setIsFeching(true);

      const meals = await getMealsByNameUseCase.execute(name);

      setSearchedMeals(meals?.slice(0, mealsToShow) ?? []);
    } catch (err: any) {
      const error = err as CoreError;

      console.error(error.message);
      setSearchedMeals(null);
    } finally {
      setIsFeching(false);
    }
  };

  return {
    searchedMeals,
    isFetching,
    getMealsByName,
  };
};
