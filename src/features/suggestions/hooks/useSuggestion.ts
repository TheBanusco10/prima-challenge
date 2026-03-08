import { useState } from "react";
import { Suggestion } from "../domain/models/Suggestion";
import type { MealPreview } from "@/features/meals/domain/models/MealPreview";
import useSuggestions from "./useSuggestions";

export default () => {
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);

  const { saveSuggestion } = useSuggestions();

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

  const suggestAgain = (params: {
    suggestions: Suggestion[];
    recipesByCategory: MealPreview[];
    recipesByArea: MealPreview[];
  }) => {
    if (!suggestion) return;

    const { recipesByCategory, recipesByArea, suggestions } = params;

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

  return {
    suggestion,
    setSuggestion,
    likeSuggestion,
    dislikeSuggestion,
    suggestAgain,
    getRandomMeal,
  };
};
