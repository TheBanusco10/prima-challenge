export type SuggestionStatus = "liked" | "disliked";

export interface SuggestionPrimitive {
  meal: any;
  tags: string[];
  status: SuggestionStatus | null;
  timestamp: string;
}

export interface SuggestionParams {
  meal: MealPreview;
  tags: string[];
  status: SuggestionStatus | null;
  timestamp: string;
}
