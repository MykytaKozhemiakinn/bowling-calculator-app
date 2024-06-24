import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BowlingScoreListComponent } from './bowling-score-list.component';
import { BowlingFrameModel } from '../../models/bowling-frame.model';
import { By } from '@angular/platform-browser';
import { BowlingData } from '../../constants/bowling-data';

describe('BowlingScoreListComponent', () => {
  let component: BowlingScoreListComponent;
  let fixture: ComponentFixture<BowlingScoreListComponent>;
  const frames: BowlingFrameModel[] = [
    { firstRoll: BowlingData.strike, secondRoll: 0 },
    { firstRoll: 7, secondRoll: 2 },
    { firstRoll: 5, secondRoll: 3, thirdRoll: 4 },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BowlingScoreListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BowlingScoreListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct score', () => {
    const testScore = 100;
    component.score = testScore;
    fixture.detectChanges();

    const scoreElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(scoreElement.textContent).toContain(`Current Score: ${testScore}`);
  });

  it('should display the correct number of frames', () => {
    component.frames = frames;
    fixture.detectChanges();

    const frameElements = fixture.debugElement.queryAll(By.css('.frame'));
    expect(frameElements.length).toBe(frames.length);
  });

  it('should display frame details correctly', () => {
    component.frames = frames;
    fixture.detectChanges();

    const frameElements = fixture.debugElement.queryAll(By.css('.frame'));
    expect(frameElements[0].nativeElement.textContent).toContain('Frame 1');
    expect(frameElements[0].nativeElement.textContent).toContain('10 - 0');
    expect(frameElements[1].nativeElement.textContent).toContain('Frame 2');
    expect(frameElements[1].nativeElement.textContent).toContain('7 - 2');
  });

  it('should display the third roll if present', () => {
    const frames: BowlingFrameModel[] = [
      { firstRoll: BowlingData.strike, secondRoll: 0 },
      { firstRoll: 5, secondRoll: 3, thirdRoll: 4 },
    ];
    component.frames = frames;
    fixture.detectChanges();

    const frameElements = fixture.debugElement.queryAll(By.css('.frame'));
    expect(frameElements[1].nativeElement.textContent).toContain('5 - 3 - 4');
  });

  it('should not display the third roll if not present', () => {
    component.frames = frames;
    fixture.detectChanges();

    const frameElements = fixture.debugElement.queryAll(By.css('.frame'));
    expect(frameElements[1].nativeElement.textContent).not.toContain('- 3');
  });
});
