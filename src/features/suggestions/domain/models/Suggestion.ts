import { MealPreview } from "@/features/meals/domain/models/MealPreview";
import type {
  SuggestionParams,
  SuggestionPrimitive,
  SuggestionStatus,
} from "../types/suggestions";

export class Suggestion {
  private readonly _meal: MealPreview;
  private readonly _tags: string[];
  private readonly _status: SuggestionStatus | null;
  private readonly _timestamp: string;

  constructor(init: SuggestionParams) {
    this._meal = init.meal;
    this._tags = init.tags;
    this._status = init.status;
    this._timestamp = init.timestamp;
  }

  get meal() {
    return this._meal;
  }

  get tags() {
    return this._tags;
  }

  get status() {
    return this._status;
  }

  get timestamp() {
    return new Date(this._timestamp);
  }

  toAPI() {
    return {
      meal: this._meal.toPrimitive(),
      tags: this._tags,
      status: this._status,
      timestamp: this._timestamp,
    };
  }

  static fromAPI(api: SuggestionPrimitive) {
    return new Suggestion({
      meal: new MealPreview(api.meal),
      tags: api.tags,
      status: api.status,
      timestamp: api.timestamp,
    });
  }
}
