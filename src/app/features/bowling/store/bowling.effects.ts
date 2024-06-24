import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, of, switchMap, withLatestFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as ScoreActions from './bowling.actions';
import { BowlingScoreCalculatorService } from '../services/bowling-score-calculator.service';
import { Store } from '@ngrx/store';
import { framesSelector } from './bowloing.selectors';
import { BowlingFramesFormBuilderService } from '../services/bowling-frames-form-builder.service';
import { resetGameSuccess } from './bowling.actions';

@Injectable()
export class BowlingEffects {
  private readonly actions$: Actions = inject(Actions);
  private readonly bowlingScoreCalculatorService: BowlingScoreCalculatorService =
    inject(BowlingScoreCalculatorService);
  private readonly bowlingFramesFormBuilderService: BowlingFramesFormBuilderService =
    inject(BowlingFramesFormBuilderService);
  private readonly store: Store = inject(Store);

  public addFrames = createEffect(() => {
    return this.actions$.pipe(
      ofType(ScoreActions.addFrame),
      exhaustMap(frame => {
        return of(ScoreActions.addFrameSuccess(frame));
      }),
      catchError(error => {
        console.error('Error adding frame:', error);
        return of(ScoreActions.addFrameFailure());
      })
    );
  });

  public calculateScore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ScoreActions.addFrameSuccess),
      switchMap(() => this.store.select(framesSelector)),
      exhaustMap(frame => {
        const score: number =
          this.bowlingScoreCalculatorService.calculateScore(frame);
        return of(ScoreActions.calculateScoreSuccess({ score }));
      }),
      catchError(error => {
        console.error('Error calculating score:', error);
        return of(ScoreActions.calculateScoreFailure());
      })
    );
  });

  public resetGame$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ScoreActions.resetGame),
      exhaustMap(() => of(ScoreActions.resetGameSuccess()))
    );
  });
}
