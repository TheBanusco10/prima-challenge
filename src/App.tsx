import { useEffect, useState } from "react";
import RecipeForm from "./features/recipes/components/Form/RecipeForm";
import { MealPreview } from "./features/recipes/domain/models/MealPreview";
import useRecipeAreas from "./features/recipes/hooks/useRecipeAreas";
import useRecipeCategories from "./features/recipes/hooks/useRecipeCategories";
import useRecipeFormat from "./features/recipes/hooks/useRecipeFormat";
import SuggestionCard from "./features/suggestions/components/SuggestionCard";
import SuggestionsTable from "./features/suggestions/components/SuggestionsTable";
import { Suggestion } from "./features/suggestions/domain/models/Suggestion";
import useSuggestions from "./features/suggestions/hooks/useSuggestions";

function App() {
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  const [recipesByCategory, setRecipesByCategory] = useState<MealPreview[]>([]);
  const [recipesByArea, setRecipesByArea] = useState<MealPreview[]>([]);

  const { getRecipesByArea } = useRecipeAreas();
  const { getRecipesByCategory } = useRecipeCategories();
  const { formatToLabel } = useRecipeFormat();
  const { suggestions, saveSuggestion, getSuggestions } = useSuggestions();

  useEffect(() => {
    getSuggestions();
  }, []);

  const handleSubmit = async (formState: Record<string, any>) => {
    const { category, cuisine } = formState;
    const [recipesByCategoryResult, recipesByAreaResult] = await Promise.all([
      getRecipesByCategory(category),
      getRecipesByArea(cuisine),
    ]);

    setRecipesByCategory(recipesByCategoryResult);
    setRecipesByArea(recipesByAreaResult);

    const randomMeal = getRandomMeal({
      recipesByCategory: recipesByCategoryResult,
      recipesByArea: recipesByAreaResult,
    });

    const tags = [formatToLabel(category), formatToLabel(cuisine)];

    setSuggestion(
      new Suggestion({
        meal: randomMeal,
        tags: tags,
        status:
          suggestions.find((s) => s.meal.id === randomMeal?.id)?.status || null,
        timestamp: new Date().toISOString(),
      }),
    );
  };

  const handleLike = () => {
    if (!suggestion) return;

    const { meal, tags } = suggestion;

    const updatedSuggestion = new Suggestion({
      meal,
      tags,
      status: "liked",
      timestamp: new Date().toISOString(),
    });

    saveSuggestion(updatedSuggestion);
    setSuggestion(updatedSuggestion);
  };

  const handleDislike = () => {
    if (!suggestion) return;

    const { meal, tags } = suggestion;

    const updatedSuggestion = new Suggestion({
      meal,
      tags,
      status: "disliked",
      timestamp: new Date().toISOString(),
    });

    saveSuggestion(updatedSuggestion);
    setSuggestion(updatedSuggestion);
  };

  const handleSuggestAgain = () => {
    if (!suggestion) return;

    const randomMeal = getRandomMeal({
      recipesByCategory,
      recipesByArea,
    });

    setSuggestion(
      new Suggestion({
        meal: randomMeal,
        tags: suggestion.tags,
        status:
          suggestions.find((s) => s.meal.id === randomMeal?.id)?.status || null,
        timestamp: new Date().toISOString(),
      }),
    );
  };

  const getRandomMeal = (params: {
    recipesByCategory: MealPreview[];
    recipesByArea: MealPreview[];
  }) => {
    const { recipesByCategory, recipesByArea } = params;

    const areaIds = new Set(recipesByArea.map((recipe) => recipe.id));

    const results = recipesByCategory.filter((recipe) =>
      areaIds.has(recipe.id),
    );

    if (!results.length) {
      return null;
    }

    let randomIndex = Math.floor(Math.random() * results.length);

    let randomMeal = results[randomIndex];

    // If the random meal is the same as the current suggestion, get the next one
    if (randomMeal.id === suggestion?.meal.id) {
      randomIndex = (randomIndex + 1) % results.length;
      randomMeal = results[randomIndex];
    }

    return randomMeal;
  };

  return (
    <main className="flex flex-col h-screen container mx-auto gap-8">
      <section className="flex justify-center [&>section]:w-96">
        <RecipeForm onSubmit={handleSubmit} />
      </section>
      <section className="flex items-center justify-center">
        {suggestion && (
          <div className="flex flex-col gap-4">
            <SuggestionCard
              suggestion={suggestion}
              onLike={handleLike}
              onDislike={handleDislike}
            />
            <button className="btn btn-outline" onClick={handleSuggestAgain}>
              New Idea
            </button>
          </div>
        )}
      </section>
      <section className="flex flex-col gap-4 px-4">
        <p className="text-lg font-semibold">Suggestions History</p>
        <SuggestionsTable suggestions={suggestions} />
      </section>
    </main>
  );
}

export default App;
