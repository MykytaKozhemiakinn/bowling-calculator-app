import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BowlingFramesFormBuilderService } from '../../services/bowling-frames-form-builder.service';
import { BowlingFrameModel } from '../../models/bowling-frame.model';
import { filter, Observable, tap } from 'rxjs';
import { BowlingFramesFormModel } from '../../models/bowling-frames-form.model';
import {
  framesSelector,
  isGameOverSelector,
  scoreSelector,
} from '../../store/bowloing.selectors';
import { ScoreActions } from '../../store';
import { BowlingScoreListComponent } from '../../components/bowling-score-list/bowling-score-list.component';
import { BowlingScoreInputComponent } from '../../components/bowling-score-input/bowling-score-input.component';
import { frameScoreValidator } from '../../validators/frame-score-validator';
import { ErrorTextComponent } from '../../../../common/components/error-text/error-text.component';
import { totalFrameScore } from '../../constants/error';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BowlingData } from '../../constants/bowling-data';

@Component({
  selector: 'app-bowling-dashboard',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BowlingScoreListComponent,
    BowlingScoreInputComponent,
    AsyncPipe,
    JsonPipe,
    ErrorTextComponent,
  ],
  templateUrl: './bowling-dashboard.component.html',
  styleUrls: ['./bowling-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BowlingDashboardComponent implements OnInit {
  private readonly store: Store = inject(Store);
  private readonly framesFormBuilderService: BowlingFramesFormBuilderService =
    inject(BowlingFramesFormBuilderService);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  public showThirdRoll = false;
  public frames!: BowlingFrameModel[] | [];
  public score$: Observable<number> = this.store.select(scoreSelector);
  public readonly isGameOver$: Observable<boolean> =
    this.store.select(isGameOverSelector);
  public readonly totalFrameScoreError = totalFrameScore;
  public readonly framesForm: FormGroup<BowlingFramesFormModel> =
    this.framesFormBuilderService.buildFramesForm();

  ngOnInit(): void {
    this.store
      .select(framesSelector)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(frames => (this.frames = frames));
    this.handleFramesFormChanges();
  }

  public formSubmitted(): void {
    if (this.framesForm.valid) {
      const frame = this.framesForm.value as BowlingFrameModel;
      this.store.dispatch(ScoreActions.addFrame({ frame }));
      this.framesForm.reset();
      this.framesForm.setValidators(frameScoreValidator());
      this.framesForm.updateValueAndValidity({ emitEvent: false });
      this.showThirdRoll = false;
    }
  }

  public resetGame(): void {
    this.store.dispatch(ScoreActions.resetGame());
  }

  private handleFramesFormChanges(): void {
    this.framesForm.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(() => this.frames.length === BowlingData.tenFrame)
      )
      .subscribe(value => {
        if (
          value.firstRoll === BowlingData.strike ||
          value.firstRoll! + value.secondRoll! === BowlingData.strike
        ) {
          this.setOrRemoveFrameScoreValidators(true);
          this.showThirdRoll = true;
        } else {
          this.setOrRemoveFrameScoreValidators(false);
          this.showThirdRoll = false;
        }
      });
  }

  private setOrRemoveFrameScoreValidators(removeScoreValidator: boolean): void {
    this.framesFormBuilderService.setOrRemoveFrameScoreValidators(
      removeScoreValidator,
      this.framesForm
    );
  }
}
