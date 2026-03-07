import type { Suggestion } from "../../domain/models/Suggestion";
import type { SuggestionsRepository } from "../../domain/repositories/suggestionsRepository";

export class AddSuggestionUseCase {
  private readonly suggestionsRepository: SuggestionsRepository;

  constructor(suggestionsRepository: SuggestionsRepository) {
    this.suggestionsRepository = suggestionsRepository;
  }

  async execute(suggestion: Suggestion) {
    const suggestions = await this.suggestionsRepository.getSuggestions();

    await this.suggestionsRepository.persist([...suggestions, suggestion]);
  }
}
