import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService } from './service/github.service';

@NgModule({
  declarations: [],
  providers: [GithubService],
  imports: [CommonModule],
})
export class GithubModule {}
