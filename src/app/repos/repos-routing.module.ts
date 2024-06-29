import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReposComponent } from './repos.component';
import { RepoInfoComponent } from './repo-info/repo-info.component';
import { repoInfoResolver } from './repo-info.resolver';

export enum REPOS_ROUTES {
  COMMITS = 'commits',
}

const routes: Routes = [
  { path: '', component: ReposComponent },
  {
    path: ':id',
    component: RepoInfoComponent,
    children: [
      {
        path: '',
        redirectTo: 'commits',
        pathMatch: 'full',
      },
      {
        path: REPOS_ROUTES.COMMITS,
        loadChildren: () =>
          import('./repo-info/commits/commits.module').then(
            (m) => m.CommitsModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReposRoutingModule {}
