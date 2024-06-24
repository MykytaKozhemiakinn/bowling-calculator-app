import { Injectable } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { BowlingFramesFormModel } from '../models/bowling-frames-form.model';
import { frameScoreValidator } from '../validators/frame-score-validator';

@Injectable({
  providedIn: 'root',
})
export class BowlingFramesFormBuilderService {
  public buildFramesForm(): FormGroup<BowlingFramesFormModel> {
    return new FormGroup(
      <BowlingFramesFormModel>{
        firstRoll: new FormControl<number>(0, {
          nonNullable: true,
          validators: this.getRollControlsValidation(),
        }),
        secondRoll: new FormControl<number>(0, {
          nonNullable: true,
          validators: this.getRollControlsValidation(),
        }),
        thirdRoll: new FormControl<number>(
          { value: 0, disabled: true },
          {
            nonNullable: true,
            validators: this.getRollControlsValidation(),
          }
        ),
      },
      { validators: frameScoreValidator() }
    );
  }

  public setOrRemoveFrameScoreValidators(
    removeScoreValidator: boolean,
    form: FormGroup<BowlingFramesFormModel>
  ): void {
    if (removeScoreValidator) {
      form.controls?.thirdRoll?.enable({ emitEvent: false });
      form.clearValidators();
      form.updateValueAndValidity({ emitEvent: false });
    } else {
      form.controls?.thirdRoll?.disable({ emitEvent: false });
      form.setValidators(frameScoreValidator());
      form.updateValueAndValidity({ emitEvent: false });
    }
  }

  private getRollControlsValidation(): ValidatorFn[] {
    return [Validators.required, Validators.min(0), Validators.max(10)];
  }
}
