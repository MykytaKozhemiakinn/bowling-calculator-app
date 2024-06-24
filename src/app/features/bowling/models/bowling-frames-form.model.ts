import { FormControl } from '@angular/forms';

export interface BowlingFramesFormModel {
  firstRoll: FormControl<number>;
  secondRoll: FormControl<number>;
  thirdRoll?: FormControl<number | null>;
}
