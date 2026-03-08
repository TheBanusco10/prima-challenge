import type { MealPreview } from "@/features/meals/domain/models/MealPreview";
import useRecipeAreas from "@/features/recipes/hooks/useRecipeAreas";
import useRecipeCategories from "@/features/recipes/hooks/useRecipeCategories";
import useRecipeFormat from "@/features/recipes/hooks/useRecipeFormat";
import { useEffect, useState } from "react";
import { Suggestion } from "../domain/models/Suggestion";
import useSuggestions from "./useSuggestions";

export default () => {
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const { suggestions, getSuggestions, saveSuggestion } = useSuggestions();
  const { formatToLabel } = useRecipeFormat();
  const { recipesByArea, getRecipesByArea } = useRecipeAreas();
  const { recipesByCategory, getRecipesByCategory } = useRecipeCategories();

  useEffect(() => {
    getSuggestions();
  }, []);

  const getSuggestion = async (formState: Record<string, any>) => {
    setIsFetching(true);

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
      setIsFetching(false);
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
    setIsFetching(false);
    setHasSearched(true);
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

  const suggestAgain = () => {
    if (!suggestion) return;

    setIsFetching(true);

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
    setIsFetching(false);
    setHasSearched(false);
  };

  const getRandomMeal = ({
    recipesByCategory,
    recipesByArea,
  }: {
    recipesByCategory: MealPreview[];
    recipesByArea: MealPreview[];
  }) => {
    const areaIds = new Set(recipesByArea.map((recipe) => recipe.id));

    const results = recipesByCategory.filter((recipe) =>
      areaIds.has(recipe.id),
    );

    if (!results.length) return null;

    let randomMeal = results[Math.floor(Math.random() * results.length)];

    if (randomMeal.id === suggestion?.meal.id && results.length > 1) {
      randomMeal =
        results.find((r) => r.id !== suggestion.meal.id) ?? randomMeal;
    }

    return randomMeal;
  };

  return {
    suggestion,
    suggestions,
    isFetching,
    hasSearched,
    setSuggestion,
    getSuggestion,
    likeSuggestion,
    dislikeSuggestion,
    suggestAgain,
  };
};
