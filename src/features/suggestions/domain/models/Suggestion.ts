import type {
  SuggestionParams,
  SuggestionPrimitive,
  SuggestionStatus,
} from "../types/suggestions";
import { MealPreview } from "../../../recipes/domain/models/MealPreview";

export class Suggestion {
  private readonly _meal: MealPreview;
  private readonly _tags: string[];
  private readonly _status: SuggestionStatus;

  constructor(init: SuggestionParams) {
    this._meal = init.meal;
    this._tags = init.tags;
    this._status = init.status;
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

  toAPI() {
    return {
      meal: this._meal.toPrimitive(),
      tags: this._tags,
      status: this._status,
    };
  }

  static fromAPI(api: SuggestionPrimitive) {
    return new Suggestion({
      meal: new MealPreview(api.meal),
      tags: api.tags,
      status: api.status,
    });
  }
}
