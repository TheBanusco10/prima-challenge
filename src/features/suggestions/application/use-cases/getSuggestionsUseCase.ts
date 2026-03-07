import type { SuggestionsRepository } from "../../domain/repositories/suggestionsRepository";

export class GetSuggestionsUseCase {
  private readonly suggestionsRepository: SuggestionsRepository;

  constructor(suggestionsRepository: SuggestionsRepository) {
    this.suggestionsRepository = suggestionsRepository;
  }

  async execute() {
    return this.suggestionsRepository.getSuggestions();
  }
}
