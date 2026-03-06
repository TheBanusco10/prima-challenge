import type { AreaModelParams } from "../types/areas";

export class Area {
  private readonly _label: string;

  constructor(init: AreaModelParams) {
    this._label = init.strArea;
  }

  get label(): string {
    return this._label;
  }
}
