import { AbstractControl } from "@angular/forms";

export class MyValidators {
  static isPriceValid(control: AbstractControl) {
    const value = control.value;
    if (value < 500) {
      return {price_invalid: true};
    }

    return null;
  }
}
