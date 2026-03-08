import type { MealDetailedParams } from "../types/meals";
import { MealPreview } from "./MealPreview";

export class MealDetailed extends MealPreview {
  private readonly _strSource: string;
  private readonly _strCategory: string;
  private readonly _strArea: string;

  constructor(init: MealDetailedParams) {
    super(init);

    this._strSource = init.strSource;
    this._strCategory = init.strCategory;
    this._strArea = init.strArea;
  }

  get category() {
    return this._strCategory;
  }

  get area() {
    return this._strArea;
  }

  get link() {
    return this._strSource;
  }

  toPrimitive() {
    return {
      ...super.toPrimitive(),
      strSource: this.link,
      strCategory: this.category,
      strArea: this.area,
    };
  }
}
