import { GetMealsByNameUseCase } from "../application/use-cases/getMealsByNameUseCase";
import { MealsDbMealsRepository } from "../infrastructure/repositories/mealsDbMealsRepository";

export default () => {
  const mealsRepository = new MealsDbMealsRepository();
  const getMealsByNameUseCase = new GetMealsByNameUseCase(mealsRepository);

  const getMealsByName = async (name: string) => {
    return await getMealsByNameUseCase.execute(name);
  };

  return {
    getMealsByName,
  };
};
