import { useState } from "react";
import { AddSuggestionUseCase } from "../application/use-cases/addSuggestionUseCase";
import { GetSuggestionsUseCase } from "../application/use-cases/getSuggestionsUseCase";
import { UpdateSuggestionUseCase } from "../application/use-cases/updateSuggestionUseCase";
import type { Suggestion } from "../domain/models/Suggestion";
import { LocalStorageSuggestionsRepository } from "../infrastructure/repositories/localStorageSuggestionsRepository";

export default () => {
  const suggestionsRepository = new LocalStorageSuggestionsRepository();

  const getSuggestionsUseCase = new GetSuggestionsUseCase(
    suggestionsRepository,
  );
  const addSuggestionUseCase = new AddSuggestionUseCase(suggestionsRepository);
  const updateSuggestionUseCase = new UpdateSuggestionUseCase(
    suggestionsRepository,
  );

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const getSuggestions = async () => {
    const suggestions = await getSuggestionsUseCase.execute();
    setSuggestions(suggestions);
    return suggestions;
  };

  const saveSuggestion = async (suggestion: Suggestion) => {
    const suggestions = await getSuggestionsUseCase.execute();

    const exists = suggestions.some((s) => s.meal.id === suggestion.meal.id);

    let updatedSuggestions: Suggestion[];

    if (exists) {
      updatedSuggestions = await updateSuggestionUseCase.execute(suggestion);
    } else {
      updatedSuggestions = await addSuggestionUseCase.execute(suggestion);
    }

    setSuggestions(updatedSuggestions);
  };

  return {
    suggestions,
    saveSuggestion,
    getSuggestions,
  };
};
