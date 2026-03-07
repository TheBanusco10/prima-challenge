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

  const saveSuggestion = async (suggestion: Suggestion) => {
    const suggestions = await getSuggestionsUseCase.execute();

    const exists = suggestions.some((s) => s.meal.id === suggestion.meal.id);

    if (exists) {
      await updateSuggestionUseCase.execute(suggestion);
      return;
    }

    await addSuggestionUseCase.execute(suggestion);
  };

  return {
    saveSuggestion,
  };
};
