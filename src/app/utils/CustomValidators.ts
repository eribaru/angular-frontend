import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);
      if (sourceCtrl != null && targetCtrl != null) {
        console.log(sourceCtrl.value + " = " + targetCtrl.value );

       console.log( sourceCtrl && targetCtrl && sourceCtrl.value != targetCtrl.value);
    }
      return sourceCtrl && targetCtrl && sourceCtrl.value != targetCtrl.value
        ? { mismatch: true }
        : null;
    };
  }
}
