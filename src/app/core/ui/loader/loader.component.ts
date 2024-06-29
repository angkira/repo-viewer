import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'rw-loader',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div *ngIf="loading" class="loader">
      <mat-spinner diameter="80"></mat-spinner>
    </div>
  `,
  styles: `
    .loader
      position: fixed
      left: 0
      top: 0
      display: flex
      justify-content: center
      align-items: center
      height: 100vh
      width: 100%
      z-index: 100
      background-color: rgba(100, 100, 100, 0.3)

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  @Input() loading: boolean = false;
}
