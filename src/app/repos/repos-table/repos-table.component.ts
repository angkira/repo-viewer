import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Repo } from '../Repo';

@Component({
  selector: 'rw-repos-table',
  templateUrl: './repos-table.component.html',
  styleUrl: './repos-table.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReposTableComponent {
  @Input() data!: Repo[];
}
