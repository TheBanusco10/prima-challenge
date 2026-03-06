import type { CategoryModelParams } from "../types/categories";

export class Category {
  private readonly _id: string;
  private readonly _name: string;

  constructor(init: CategoryModelParams) {
    this._id = init.idCategory;
    this._name = init.strCategory;
  }

  get name(): string {
    return this._name;
  }

  get id(): string {
    return this._id;
  }
}
