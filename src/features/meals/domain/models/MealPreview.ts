import type { MealPreviewParams } from "../types/meals";

export class MealPreview {
  private readonly _strMeal: string;
  private readonly _strMealThumb: string;
  private readonly _idMeal: string;

  constructor(init: MealPreviewParams) {
    this._strMeal = init.strMeal;
    this._strMealThumb = init.strMealThumb;
    this._idMeal = init.idMeal;
  }

  get title(): string {
    return this._strMeal;
  }

  get mealThumb(): string {
    return this._strMealThumb;
  }

  get id(): string {
    return this._idMeal;
  }

  toPrimitive() {
    return {
      idMeal: this.id,
      strMeal: this.title,
      strMealThumb: this.mealThumb,
    };
  }
}
