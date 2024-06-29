import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rw-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {

}
