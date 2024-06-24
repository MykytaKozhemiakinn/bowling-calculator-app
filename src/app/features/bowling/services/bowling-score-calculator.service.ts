import { Injectable } from '@angular/core';
import { BowlingFrameModel } from '../models/bowling-frame.model';
import { BowlingData } from '../constants/bowling-data';

@Injectable({
  providedIn: 'root',
})
export class BowlingScoreCalculatorService {
  public calculateScore(frames: BowlingFrameModel[]): number {
    let score = 0;

    for (let i = 0; i < frames.length; i++) {
      const frame: BowlingFrameModel = frames[i];
      score += frame.firstRoll + frame.secondRoll;
      if (i < BowlingData.tenFrame) {
        if (frame.firstRoll === BowlingData.strike) {
          score += this.strikeBonus(i, frames);
        } else if (frame.firstRoll + frame.secondRoll === BowlingData.strike) {
          score += this.spareBonus(i, frames);
        }
      } else {
        score += frame.thirdRoll || 0;
      }
    }

    return score;
  }

  private strikeBonus(frameIndex: number, frames: BowlingFrameModel[]): number {
    if (frameIndex + 1 >= frames.length) {
      return 0;
    }
    const nextFrame: BowlingFrameModel = frames[frameIndex + 1];
    if (
      nextFrame.firstRoll === BowlingData.strike &&
      frameIndex + 2 < frames.length
    ) {
      return nextFrame.firstRoll + frames[frameIndex + 2].firstRoll;
    } else {
      return nextFrame.firstRoll + (nextFrame.secondRoll || 0);
    }
  }

  private spareBonus(frameIndex: number, frames: BowlingFrameModel[]): number {
    if (frameIndex + 1 >= frames.length) {
      return 0;
    }
    const nextFrame: BowlingFrameModel = frames[frameIndex + 1];
    return nextFrame.firstRoll;
  }
}
