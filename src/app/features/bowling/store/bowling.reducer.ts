import { createReducer, on } from '@ngrx/store';
import * as ScoreActions from './bowling.actions';

import { BowlingScoreStateModel } from '../models/bowling-score-state.model';
import { resetGameSuccess } from './bowling.actions';
import { BowlingData } from '../constants/bowling-data';

export const FeatureKey = 'score';

const initialState: BowlingScoreStateModel = {
  frames: [],
  score: 0,
  isGameOver: false,
};

export const bowlingReducer = createReducer(
  initialState,

  on(
    ScoreActions.addFrameSuccess,
    (state: BowlingScoreStateModel, { frame }): BowlingScoreStateModel => ({
      ...state,
      frames: [...state.frames, frame],
    })
  ),
  on(
    ScoreActions.addFrameFailure,
    (state: BowlingScoreStateModel): BowlingScoreStateModel => ({
      ...state,
      frames: [],
      isGameOver: false,
    })
  ),
  on(
    ScoreActions.calculateScoreSuccess,
    (state: BowlingScoreStateModel, { score }): BowlingScoreStateModel => ({
      ...state,
      score,
      isGameOver: state.frames.length === BowlingData.strike,
    })
  ),
  on(
    ScoreActions.calculateScoreFailure,
    (state: BowlingScoreStateModel): BowlingScoreStateModel => ({
      ...state,
      score: 0,
      isGameOver: false,
    })
  ),
  on(
    ScoreActions.resetGameSuccess,
    (state): BowlingScoreStateModel => initialState
  )
);
