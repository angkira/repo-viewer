import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CoreModule } from '../core/core.module';

@Component({
  selector: 'rw-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
