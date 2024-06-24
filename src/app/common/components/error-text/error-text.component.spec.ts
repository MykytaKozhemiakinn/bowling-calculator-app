import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorTextComponent } from './error-text.component';

describe('ErrorTextComponent', () => {
  let component: ErrorTextComponent;
  let fixture: ComponentFixture<ErrorTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorTextComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorTextComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display errorText when input is provided', () => {
    const testErrorText = 'Test Error Message';
    component.errorText = testErrorText;
    fixture.detectChanges();
    const errorTextElement: HTMLElement =
      fixture.nativeElement.querySelector('.error');
    expect(errorTextElement).toBeTruthy();
    expect(errorTextElement.textContent).toContain(testErrorText);
  });

  it('should not display errorText when input is not provided', () => {
    const testErrorText = 'Test Error Message';
    const errorTextElement: HTMLElement =
      fixture.nativeElement.querySelector('.error');
    expect(errorTextElement).not.toContain(testErrorText);
  });
});
