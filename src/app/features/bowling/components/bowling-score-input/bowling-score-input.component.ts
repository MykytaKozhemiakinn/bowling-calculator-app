import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ErrorTextComponent } from '../../../../common/components/error-text/error-text.component';
import { minRollValue } from '../../constants/error';

@Component({
  selector: 'app-score-input',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorTextComponent],
  templateUrl: './bowling-score-input.component.html',
  styleUrl: './bowling-score-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BowlingScoreInputComponent {
  @Input() label!: string | null;
  @Input() control!: FormControl<number | null>;

  public readonly minRollValueError = minRollValue;
}
