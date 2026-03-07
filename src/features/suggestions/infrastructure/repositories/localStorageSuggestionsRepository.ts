import { Suggestion } from "../../domain/models/Suggestion";
import type { SuggestionsRepository } from "../../domain/repositories/suggestionsRepository";
import type { SuggestionPrimitive } from "../../domain/types/suggestions";

const SUGGESTIONS_LOCAL_STORAGE_KEY = "suggestions";

export class LocalStorageSuggestionsRepository implements SuggestionsRepository {
  async getSuggestions(): Promise<Suggestion[]> {
    const stored = window.localStorage.getItem(SUGGESTIONS_LOCAL_STORAGE_KEY);

    if (!stored) return [];

    const parsed: SuggestionPrimitive[] = JSON.parse(stored);

    return parsed.map((s) => Suggestion.fromAPI(s));
  }

  async persist(suggestions: Suggestion[]): Promise<void> {
    const suggestionsToApi = suggestions.map((s) => s.toAPI());

    window.localStorage.setItem(
      SUGGESTIONS_LOCAL_STORAGE_KEY,
      JSON.stringify(suggestionsToApi),
    );
  }
}
