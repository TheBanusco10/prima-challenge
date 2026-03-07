import type { Suggestion } from "../models/Suggestion";

export interface SuggestionsRepository {
  getSuggestions(): Promise<Suggestion[]>;
  persist(suggestions: Suggestion[]): Promise<void>;
}
