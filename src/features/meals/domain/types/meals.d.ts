export interface MealPreviewParams {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

export interface MealDetailedParams extends MealPreviewParams {
  strCategory: string;
  strArea: string;
  strSource: string;
}
