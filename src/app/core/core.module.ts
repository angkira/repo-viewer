import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubModule } from './github/github.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from './ui/ui.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, GithubModule, UiModule],
  exports: [CommonModule, ReactiveFormsModule, GithubModule, UiModule],
})
export class CoreModule {}
