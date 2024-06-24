import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { BowlingScoreInputComponent } from './bowling-score-input.component';
import { ErrorTextComponent } from '../../../../common/components/error-text/error-text.component';

describe('BowlingScoreInputComponent', () => {
  let component: BowlingScoreInputComponent;
  let fixture: ComponentFixture<BowlingScoreInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BowlingScoreInputComponent,
        ErrorTextComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BowlingScoreInputComponent);
    component = fixture.componentInstance;
    component.label = 'Test Label';
    component.control = new FormControl(null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label and input', () => {
    fixture.detectChanges();
    const labelElement: HTMLElement =
      fixture.nativeElement.querySelector('label');
    const inputElement: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    expect(labelElement).toBeTruthy();
    expect(labelElement.innerText).toContain('Test Label');
    expect(inputElement).toBeTruthy();
  });

  it('should disable input when control is disabled', () => {
    component.control.disable();
    fixture.detectChanges();
    const inputElement: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    expect(inputElement.disabled).toBe(true);
  });
});
