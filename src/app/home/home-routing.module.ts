import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export enum HOME_ROUTES {
  REPO = 'repo',
  NOT_FOUND = 'not-found',
}

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: HOME_ROUTES.REPO,
        pathMatch: 'full',
      },
      {
        path: HOME_ROUTES.REPO,
        loadChildren: () =>
          import('../repos/repos.module').then((m) => m.ReposModule),
      },
      {
        path: HOME_ROUTES.NOT_FOUND,
        loadComponent: () =>
          import('./not-found/not-found.component').then(
            (m) => m.NotFoundComponent,
          ),
      },
      {
        path: '**',
        redirectTo: HOME_ROUTES.NOT_FOUND,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
