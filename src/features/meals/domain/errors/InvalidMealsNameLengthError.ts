import { CoreError } from "@/features/core/domain/errors/CoreError";

export class InvalidMealsNameLengthError extends CoreError {
  constructor() {
    super("Meal name must have at least 3 characters");
  }
}
