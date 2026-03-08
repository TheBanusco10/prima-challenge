import { useState } from "react";
import { Suggestion } from "../domain/models/Suggestion";
import type { MealPreview } from "@/features/meals/domain/models/MealPreview";
import useSuggestions from "./useSuggestions";
import useRecipeFormat from "@/features/recipes/hooks/useRecipeFormat";
import useRecipeAreas from "@/features/recipes/hooks/useRecipeAreas";
import useRecipeCategories from "@/features/recipes/hooks/useRecipeCategories";

export default () => {
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  const [isFetching, setIsFeching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const { saveSuggestion } = useSuggestions();
  const { formatToLabel } = useRecipeFormat();
  const { recipesByArea, getRecipesByArea } = useRecipeAreas();
  const { recipesByCategory, getRecipesByCategory } = useRecipeCategories();

  const getSuggestion = async (params: {
    formState: Record<string, any>;
    suggestions: Suggestion[];
  }) => {
    setIsFeching(true);

    const {
      formState: { category, cuisine },
      suggestions,
    } = params;

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
      setIsFeching(false);
      setHasSearched(true);
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
    setIsFeching(false);
    setHasSearched(false);
  };

  const likeSuggestion = () => {
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

  const dislikeSuggestion = () => {
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

  const suggestAgain = (params: { suggestions: Suggestion[] }) => {
    if (!suggestion) return;

    setIsFeching(true);

    const { suggestions } = params;

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
    setIsFeching(false);
    setHasSearched(false);
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

  return {
    suggestion,
    isFetching,
    hasSearched,
    setSuggestion,
    getSuggestion,
    likeSuggestion,
    dislikeSuggestion,
    suggestAgain,
    getRandomMeal,
  };
};
