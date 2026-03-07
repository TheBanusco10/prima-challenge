import type { Suggestion } from "../../domain/models/Suggestion";
import type { SuggestionsRepository } from "../../domain/repositories/suggestionsRepository";

export class AddSuggestionUseCase {
  private readonly suggestionsRepository: SuggestionsRepository;

  constructor(suggestionsRepository: SuggestionsRepository) {
    this.suggestionsRepository = suggestionsRepository;
  }

  async execute(suggestion: Suggestion) {
    const suggestions = await this.suggestionsRepository.getSuggestions();

    const suggestionsToSave = [...suggestions, suggestion];

    await this.suggestionsRepository.persist(suggestionsToSave);

    return suggestionsToSave;
  }
}
