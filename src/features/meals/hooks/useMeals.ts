import { useState } from "react";
import { GetMealsByNameUseCase } from "../application/use-cases/getMealsByNameUseCase";
import { MealsDbMealsRepository } from "../infrastructure/repositories/mealsDbMealsRepository";

const mealsRepository = new MealsDbMealsRepository();
const getMealsByNameUseCase = new GetMealsByNameUseCase(mealsRepository);

export default () => {
  const [isFetching, setIsFeching] = useState(false);
  
  const getMealsByName = async (name: string) => {
    try {
      setIsFeching(true);

      return await getMealsByNameUseCase.execute(name);
    }catch (err: any) {
      const error: Error = err.message;

      console.error(error.message);
    }finally {
      setIsFeching(false);
    }
  };

  return {
    isFetching,
    getMealsByName,
  };
};
