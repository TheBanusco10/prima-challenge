import { useEffect, useState } from "react";
import RecipeForm from "./features/recipes/components/Form/RecipeForm";
import { MealPreview } from "./features/meals/domain/models/MealPreview";
import useRecipeAreas from "./features/recipes/hooks/useRecipeAreas";
import useRecipeCategories from "./features/recipes/hooks/useRecipeCategories";
import useRecipeFormat from "./features/recipes/hooks/useRecipeFormat";
import SuggestionCard from "./features/suggestions/components/SuggestionCard";
import SuggestionsTable from "./features/suggestions/components/SuggestionsTable";
import { Suggestion } from "./features/suggestions/domain/models/Suggestion";
import useSuggestions from "./features/suggestions/hooks/useSuggestions";
import SearchMealsSection from "./features/meals/components/SearchMealsSection";
import useSuggestion from "./features/suggestions/hooks/useSuggestion";

function App() {
  const [hasSearched, setHasSearched] = useState(false);

  const { recipesByArea, getRecipesByArea } = useRecipeAreas();
  const { recipesByCategory, getRecipesByCategory } = useRecipeCategories();
  const { formatToLabel } = useRecipeFormat();
  const { suggestions, getSuggestions } = useSuggestions();
  const {
    suggestion,
    setSuggestion,
    getRandomMeal,
    likeSuggestion,
    dislikeSuggestion,
    suggestAgain,
  } = useSuggestion();

  useEffect(() => {
    getSuggestions();
  }, []);

  const handleSubmit = async (formState: Record<string, any>) => {
    setHasSearched(true);

    const { category, cuisine } = formState;

    const [recipesByCategoryResult, recipesByAreaResult] = await Promise.all([
      getRecipesByCategory(category),
      getRecipesByArea(cuisine),
    ]);

    const randomMeal = getRandomMeal({
      recipesByCategory: recipesByCategoryResult,
      recipesByArea: recipesByAreaResult,
    });

    if (!randomMeal) {
      setSuggestion(null);
      return;
    }

    const tags = [formatToLabel(category), formatToLabel(cuisine)];

    setSuggestion(
      new Suggestion({
        meal: randomMeal,
        tags,
        status:
          suggestions.find((s) => s.meal.id === randomMeal?.id)?.status || null,
        timestamp: new Date().toISOString(),
      }),
    );
  };

  return (
    <main className="flex flex-col lg:flex-row h-screen container mx-auto gap-8 pt-4">
      <section className="flex flex-wrap max-md:justify-center flex-row lg:flex-col [&>section]:w-96 [&>section]:max-md:mx-auto [&>section]:lg:px-0">
        <RecipeForm onSubmit={handleSubmit} />
        {suggestion && (
          <div className="flex flex-col gap-4">
            <SuggestionCard
              suggestion={suggestion}
              onLike={likeSuggestion}
              onDislike={dislikeSuggestion}
            />
            <button
              className="btn btn-outline"
              onClick={() =>
                suggestAgain({
                  recipesByArea,
                  recipesByCategory,
                  suggestions,
                })
              }
            >
              New Idea
            </button>
          </div>
        )}
        {hasSearched && !suggestion && (
          <p className="text-center">No results found</p>
        )}
      </section>
      <section className="flex flex-col flex-1 gap-4 px-4">
        <div>
          <p className="text-lg font-semibold mb-2">Suggestions History</p>
          <SuggestionsTable suggestions={suggestions} />
        </div>
        <div>
          <p className="text-lg font-semibold mb-2">Search Meals</p>
          <SearchMealsSection />
        </div>
      </section>
    </main>
  );
}

export default App;
