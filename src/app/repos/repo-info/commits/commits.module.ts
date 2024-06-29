import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommitsRoutingModule } from './commits-routing.module';
import { CommitsComponent } from './commits.component';

import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { CoreModule } from '../../../core/core.module';

const MatUIModules = [
  MatTableModule,
  MatFormFieldModule,
  MatSliderModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatCardModule,
];

@NgModule({
  declarations: [CommitsComponent],
  imports: [CoreModule, CommitsRoutingModule, ...MatUIModules],
})
export class CommitsModule {}
