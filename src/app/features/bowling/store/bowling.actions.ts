import { createAction, props } from '@ngrx/store';
import { BowlingScoreActionTypes } from './bowling.action-types.enum';
import { BowlingFrameModel } from '../models/bowling-frame.model';
import { FormGroup } from '@angular/forms';
import { BowlingFramesFormModel } from '../models/bowling-frames-form.model';

export const addFrame = createAction(
  BowlingScoreActionTypes.BOWLING_ADD_FRAME,
  props<{ frame: BowlingFrameModel }>()
);
export const addFrameSuccess = createAction(
  BowlingScoreActionTypes.BOWLING_ADD_FRAME_SUCESS,
  props<{
    frame: BowlingFrameModel;
  }>()
);
export const addFrameFailure = createAction(
  BowlingScoreActionTypes.BOWLING_ADD_FRAME_FAILURE
);

export const calculateScoreSuccess = createAction(
  BowlingScoreActionTypes.BOWLING_CALCULATE_SCORE_SUCCESS,
  props<{
    score: number;
  }>()
);
export const calculateScoreFailure = createAction(
  BowlingScoreActionTypes.BOWLING_CALCULATE_SCORE_FAILURE
);

export const resetGame = createAction(
  BowlingScoreActionTypes.BOWLING_RESET_GAME
);
export const resetGameSuccess = createAction(
  BowlingScoreActionTypes.BOWLING_RESET_GAME_SUCCESS
);
