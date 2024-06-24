import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BowlingFrameModel } from '../../models/bowling-frame.model';

@Component({
  selector: 'app-score-list',
  standalone: true,
  templateUrl: './bowling-score-list.component.html',
  styleUrl: './bowling-score-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BowlingScoreListComponent {
  @Input() frames!: BowlingFrameModel[] | [] | null;
  @Input() score!: number | null;
}
