import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BowlingDashboardComponent } from './features/bowling/views/bowling-dashboard/bowling-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  imports: [BowlingDashboardComponent],
})
export class AppComponent {}
