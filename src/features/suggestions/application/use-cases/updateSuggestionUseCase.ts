import type { Suggestion } from "../../domain/models/Suggestion";
import type { SuggestionsRepository } from "../../domain/repositories/suggestionsRepository";

export class UpdateSuggestionUseCase {
  private readonly suggestionsRepository: SuggestionsRepository;

  constructor(suggestionsRepository: SuggestionsRepository) {
    this.suggestionsRepository = suggestionsRepository;
  }

  async execute(suggestion: Suggestion) {
    const suggestions = await this.suggestionsRepository.getSuggestions();

    const updated = suggestions.map((s) =>
      s.meal.id === suggestion.meal.id ? suggestion : s,
    );

    await this.suggestionsRepository.persist(updated);

    return updated;
  }
}
