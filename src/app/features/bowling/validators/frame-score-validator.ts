import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { BowlingData } from '../constants/bowling-data';

export function frameScoreValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const firstRoll = control.get('firstRoll')?.value ?? 0;
    const secondRoll = control.get('secondRoll')?.value ?? 0;

    return firstRoll + secondRoll > BowlingData.strike
      ? { frameScoreInvalid: true }
      : null;
  };
}
