import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';

@Component({
  selector: 'app-bowling-dashboard',
  template: '<div>Mock Bowling Dashboard Component</div>',
})
class MockBowlingDashboardComponent {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      declarations: [MockBowlingDashboardComponent],
      providers: [provideMockStore({})],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render BowlingDashboardComponent', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-bowling-dashboard')).toBeTruthy();
  });
});
