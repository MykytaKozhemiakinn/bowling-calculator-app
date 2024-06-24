import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BowlingDashboardComponent } from './bowling-dashboard.component';
import { Store } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BowlingScoreListComponent } from '../../components/bowling-score-list/bowling-score-list.component';
import { BowlingScoreInputComponent } from '../../components/bowling-score-input/bowling-score-input.component';
import { ErrorTextComponent } from '../../../../common/components/error-text/error-text.component';
import { BowlingFramesFormBuilderService } from '../../services/bowling-frames-form-builder.service';
import { ScoreActions } from '../../store';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { BowlingData } from '../../constants/bowling-data';

describe('BowlingDashboardComponent', () => {
  let component: BowlingDashboardComponent;
  let fixture: ComponentFixture<BowlingDashboardComponent>;
  let store: MockStore;
  let framesFormBuilderService: BowlingFramesFormBuilderService;
  const mockFrames: [] = [];
  const initialState = { frames: mockFrames, score: 0, isGameOver: false };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BowlingScoreListComponent,
        BowlingScoreInputComponent,
        BowlingDashboardComponent,
        ErrorTextComponent,
      ],
      providers: [
        provideMockStore({ initialState }),
        BowlingFramesFormBuilderService,
      ],
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore;
    framesFormBuilderService = TestBed.inject(BowlingFramesFormBuilderService);
    fixture = TestBed.createComponent(BowlingDashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the current score', () => {
    component.score$ = of(BowlingData.strike);
    fixture.detectChanges();
    const scoreElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(scoreElement.textContent).toContain('Current Score: 10');
  });

  it('should display frames correctly', () => {
    component.frames = mockFrames;
    fixture.detectChanges();
    const frameElements = fixture.debugElement.queryAll(By.css('.frame'));
    expect(frameElements.length).toBe(mockFrames.length);
  });

  it('should be able to submit form', () => {
    spyOn(store, 'dispatch');
    component.framesForm.controls['firstRoll'].setValue(5);
    component.framesForm.controls['secondRoll'].setValue(5);
    component.formSubmitted();
    expect(store.dispatch).toHaveBeenCalledWith(
      ScoreActions.addFrame({ frame: { firstRoll: 5, secondRoll: 5 } })
    );
  });

  it('should reset game', () => {
    spyOn(store, 'dispatch');
    component.resetGame();
    expect(store.dispatch).toHaveBeenCalledWith(ScoreActions.resetGame());
  });

  it('should display error message when frame score is invalid', () => {
    component.framesForm.controls['firstRoll'].setValue(BowlingData.strike);
    component.framesForm.controls['secondRoll'].setValue(5);
    component.framesForm.setErrors({ frameScoreInvalid: true });
    fixture.detectChanges();
    const errorTextElement = fixture.debugElement.query(
      By.css('app-error-text')
    );
    expect(errorTextElement).toBeTruthy();
  });
  it('should not show third roll input when not necessary', () => {
    component.frames = Array(BowlingData.tenFrame).fill({
      firstRoll: 9,
      secondRoll: 0,
    });
    component.framesForm.controls['firstRoll'].setValue(5);
    component.framesForm.controls['secondRoll'].setValue(4);
    component.framesForm.updateValueAndValidity();
    fixture.detectChanges();
    const thirdRollElement = fixture.debugElement.query(
      By.css('.input-column:nth-child(3)')
    );
    expect(thirdRollElement).toBeFalsy();
  });
});
