import { NgModule } from '@angular/core';

import { CoreModule } from '../core/core.module';
import { ReposRoutingModule } from './repos-routing.module';
import { ReposComponent } from './repos.component';
import { ReposService } from './repos.service';

import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';

import { ReposFilterComponent } from './repos-filter/repos-filter.component';
import { ReposTableComponent } from './repos-table/repos-table.component';
import { RepoInfoComponent } from './repo-info/repo-info.component';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const MatUIModules = [
  MatTableModule,
  MatFormFieldModule,
  MatSliderModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatButton,
  MatIconButton,
  MatIconModule,
];

@NgModule({
  declarations: [
    ReposComponent,
    ReposFilterComponent,
    ReposTableComponent,
    RepoInfoComponent,
  ],
  providers: [ReposService],
  imports: [CoreModule, ReposRoutingModule, ...MatUIModules],
})
export class ReposModule {}
