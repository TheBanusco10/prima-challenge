import { useState } from "react";
import { GetAllAreasUseCase } from "../application/use-cases/getAllAreasUseCase";
import { MealDbRecipeRepository } from "../infrastructure/repositories/mealDbRecipeRepository";
import type { Area } from "../domain/models/Area";

export default () => {
  const getAllAreasUseCase = new GetAllAreasUseCase(
    new MealDbRecipeRepository(),
  );

  const [allAreas, setAllAreas] = useState<Area[]>([]);
  const [fetching, setFetching] = useState(false);

  const getAllAreas = async () => {
    setFetching(true);
    const areas = await getAllAreasUseCase.execute();
    setAllAreas(areas);
    setFetching(false);
  };

  return {
    allAreas,
    fetching,
    getAllAreas,
  };
};
