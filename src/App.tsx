import { useState } from "react";
import RecipeForm from "./features/recipes/components/Form/RecipeForm";
import SuggestionCard from "./features/suggestions/components/SuggestionCard";
import type { MealPreview } from "./features/recipes/domain/models/MealPreview";
import useRecipeAreas from "./features/recipes/hooks/useRecipeAreas";
import useRecipeCategories from "./features/recipes/hooks/useRecipeCategories";
import useRecipeFormat from "./features/recipes/hooks/useRecipeFormat";
import useSuggestions from "./features/suggestions/hooks/useSuggestions";
import { Suggestion } from "./features/suggestions/domain/models/Suggestion";
import type { SuggestionStatus } from "./features/suggestions/domain/types/suggestions";

function App() {
  const [suggestion, setSuggestion] = useState<MealPreview | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [recipesByCategory, setRecipesByCategory] = useState<MealPreview[]>([]);
  const [recipesByArea, setRecipesByArea] = useState<MealPreview[]>([]);
  const [status, setStatus] = useState<SuggestionStatus | null>(null);

  const { getRecipesByArea } = useRecipeAreas();
  const { getRecipesByCategory } = useRecipeCategories();
  const { formatToLabel } = useRecipeFormat();
  const { saveSuggestion } = useSuggestions();

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

    setTags([formatToLabel(category), formatToLabel(cuisine)]);

    applySuggestion(randomMeal);
  };

  const handleLike = () => {
    const suggestionModel = new Suggestion({
      meal: suggestion!,
      tags: tags,
      status: "liked",
    });

    saveSuggestion(suggestionModel);

    setStatus("liked");
  };

  const handleDislike = () => {
    const suggestionModel = new Suggestion({
      meal: suggestion!,
      tags: tags,
      status: "disliked",
    });

    saveSuggestion(suggestionModel);

    setStatus("disliked");
  };

  const suggestAgain = () => {
    const randomMeal = getRandomMeal({
      recipesByCategory,
      recipesByArea,
    });

    applySuggestion(randomMeal);
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
    if (randomMeal.id === suggestion?.id) {
      randomIndex = (randomIndex + 1) % results.length;
      randomMeal = results[randomIndex];
    }

    return randomMeal;
  };

  const applySuggestion = (meal: MealPreview | null) => {
    setSuggestion(meal);
    setStatus(null);
  };

  return (
    <main className="h-screen container mx-auto">
      <section className="flex justify-center [&>section]:w-96">
        <RecipeForm onSubmit={handleSubmit} />
      </section>
      <section className="flex items-center justify-center">
        {suggestion && (
          <div className="flex flex-col gap-4">
            <SuggestionCard
              mealPreview={suggestion}
              tags={tags}
              status={status}
              onLike={handleLike}
              onDislike={handleDislike}
            />
            <button className="btn btn-outline" onClick={suggestAgain}>
              New Idea
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
