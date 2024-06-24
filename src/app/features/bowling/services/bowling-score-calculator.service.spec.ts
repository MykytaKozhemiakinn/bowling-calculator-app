import { TestBed } from '@angular/core/testing';
import { BowlingScoreCalculatorService } from './bowling-score-calculator.service';
import { BowlingFrameModel } from '../models/bowling-frame.model';
import { provideMockStore } from '@ngrx/store/testing';
import { BowlingData } from '../constants/bowling-data';

describe('BowlingScoreCalculatorService', () => {
  let service: BowlingScoreCalculatorService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BowlingScoreCalculatorService, provideMockStore({})],
    });
    service = TestBed.inject(BowlingScoreCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate the score for a game with usual roles', () => {
    const frames: BowlingFrameModel[] = [
      { firstRoll: 1, secondRoll: 2 },
      { firstRoll: 3, secondRoll: 4 },
      { firstRoll: 5, secondRoll: 4 },
    ];
    expect(service.calculateScore(frames)).toEqual(19);
  });

  it('should calculate the score for a game with spares', () => {
    const frames: BowlingFrameModel[] = [
      { firstRoll: 6, secondRoll: 4 },
      { firstRoll: 3, secondRoll: 6 },
      { firstRoll: 7, secondRoll: 3 },
    ];
    expect(service.calculateScore(frames)).toEqual(32);
  });

  it('should calculate the score for a game with strikes', () => {
    const frames: BowlingFrameModel[] = [
      { firstRoll: BowlingData.strike, secondRoll: 0 },
      { firstRoll: 0, secondRoll: BowlingData.strike },
      { firstRoll: 1, secondRoll: 2 },
    ];
    expect(service.calculateScore(frames)).toEqual(34);
  });

  it('should calculate the score for the final frame with a strike', () => {
    const frames: BowlingFrameModel[] = [
      { firstRoll: 1, secondRoll: 2 },
      { firstRoll: 2, secondRoll: 5 },
      { firstRoll: BowlingData.strike, secondRoll: 0, thirdRoll: 0 },
    ];
    expect(service.calculateScore(frames)).toEqual(20);
  });

  it('should calculate the score for the final frame with a spare', () => {
    const frames: BowlingFrameModel[] = [
      { firstRoll: 4, secondRoll: 5 },
      { firstRoll: 3, secondRoll: 6 },
      { firstRoll: 5, secondRoll: 5, thirdRoll: 4 },
    ];
    expect(service.calculateScore(frames)).toEqual(28);
  });
});
