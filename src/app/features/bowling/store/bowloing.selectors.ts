import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureKey } from './bowling.reducer';
import { BowlingScoreStateModel } from '../models/bowling-score-state.model';
import { BowlingFrameModel } from '../models/bowling-frame.model';

const selectConfigState =
  createFeatureSelector<BowlingScoreStateModel>(FeatureKey);

export const framesSelector = createSelector(
  selectConfigState,
  ({ frames }): BowlingFrameModel[] | [] => frames
);
export const scoreSelector = createSelector(
  selectConfigState,
  ({ score }): number => score
);
export const isGameOverSelector = createSelector(
  selectConfigState,
  ({ isGameOver }): boolean => isGameOver
);
