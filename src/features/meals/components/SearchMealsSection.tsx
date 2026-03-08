import CoreInput from "@/features/core/components/CoreInput";
import { debounce } from "es-toolkit";
import { useState } from "react";
import type { MealDetailed } from "../domain/models/MealDetailed";
import useMeals from "../hooks/useMeals";
import MealCard from "./MealCard";

const MAX_MEALS_TO_SHOW = 5;

function SearchMealsSection() {
  const [searchedMeals, setSearchedMeals] = useState<MealDetailed[]>([]);
  const { getMealsByName } = useMeals();

  const getMealsDebounce = debounce(async (name: string) => {
    const meals = await getMealsByName(name);

    setSearchedMeals(meals.slice(0, MAX_MEALS_TO_SHOW));
  }, 500);

  const handleGetMeals = async (name: string) => {
    if (!name.length) {
      setSearchedMeals([]);
      return;
    }

    if (name.length <= 3) return;

    await getMealsDebounce(name);
  };

  return (
    <div className="flex flex-col gap-4">
      <CoreInput
        label="Meal name"
        placeholder="Search meals by name"
        onChange={(value: string) => handleGetMeals(value)}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {searchedMeals.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  );
}

export default SearchMealsSection;
