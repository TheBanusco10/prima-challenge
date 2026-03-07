import { useState } from "react";
import { GetAllAreasUseCase } from "../application/use-cases/getAllAreasUseCase";
import { MealDbRecipeRepository } from "../infrastructure/repositories/mealDbRecipeRepository";
import type { Area } from "../domain/models/Area";
import { GetRecipesByAreaUseCase } from "../application/use-cases/getRecipesByAreaUseCase";

export default () => {
  const recipeRepository = new MealDbRecipeRepository();
  const getAllAreasUseCase = new GetAllAreasUseCase(recipeRepository);
  const getRecipesByAreaUseCase = new GetRecipesByAreaUseCase(recipeRepository);

  const [allAreas, setAllAreas] = useState<Area[]>([]);
  const [fetching, setFetching] = useState(false);

  const getAllAreas = async () => {
    setFetching(true);
    const areas = await getAllAreasUseCase.execute();
    setAllAreas(areas);
    setFetching(false);
  };

  const getRecipesByArea = async (area: string) => {
    const recipes = await getRecipesByAreaUseCase.execute(area);
    return recipes;
  };

  return {
    allAreas,
    fetching,
    getAllAreas,
    getRecipesByArea,
  };
};
