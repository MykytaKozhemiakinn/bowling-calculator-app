import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-text',
  standalone: true,
  templateUrl: './error-text.component.html',
  styleUrl: './error-text.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorTextComponent {
  @Input() errorText!: string;
}
