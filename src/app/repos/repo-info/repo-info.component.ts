import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { ReposService } from '../repos.service';
import { Repo } from '../Repo';

@Component({
  selector: 'rw-repo-info',
  templateUrl: './repo-info.component.html',
  styleUrl: './repo-info.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepoInfoComponent {
  repoInfo$: Observable<Repo>;

  constructor(
    private route: ActivatedRoute,
    private reposService: ReposService,
  ) {
    this.repoInfo$ = this.route.paramMap.pipe(
      filter((params) => params.has('id') && params.get('id') !== null),
      switchMap((params) =>
        this.reposService.getRepoById(params.get('id') as string),
      ),
    );
  }
}
