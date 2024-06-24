import { BowlingFrameModel } from './bowling-frame.model';

export interface BowlingScoreStateModel {
  frames: BowlingFrameModel[] | [];
  score: number;
  isGameOver: boolean;
}
