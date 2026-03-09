import SkeletonCardLayout from "@/features/core/components/Cards/SkeletonCardLayout";
import CoreInput from "@/features/core/components/CoreInput";
import { debounce } from "es-toolkit";
import useMeals from "../hooks/useMeals";
import MealCard from "./MealCard";

function SearchMealsSection() {
  const { isFetching, searchedMeals, getMealsByName } = useMeals();

  const getMealsDebounce = debounce(getMealsByName, 500);

  return (
    <div className="flex flex-col gap-4 mb-4">
      <CoreInput
        id="meal-name-input"
        label="Meal name"
        placeholder="Search meals by name"
        onChange={getMealsDebounce}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {isFetching &&
          Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCardLayout key={i} />
          ))}
        {!isFetching &&
          searchedMeals?.map((meal) => <MealCard key={meal.id} meal={meal} />)}
        {!isFetching && searchedMeals?.length === 0 && <p>No results found</p>}
      </div>
    </div>
  );
}

export default SearchMealsSection;
