import { CoreError } from "@/features/core/domain/errors/CoreError";

export class MealsApiError extends CoreError {
  constructor(message: string) {
    super(message);
  }
}
