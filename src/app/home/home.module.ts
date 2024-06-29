import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';

import { HomeRoutingModule } from './home-routing.module';
import { CoreModule } from '../core/core.module';
import { HomeComponent } from './home.component';
import { MatToolbarModule } from '@angular/material/toolbar';

const MatUIModules = [MatCardModule, MatToolbarModule];

@NgModule({
  declarations: [HomeComponent],
  imports: [CoreModule, HomeRoutingModule, ...MatUIModules],
})
export class HomeModule {}
