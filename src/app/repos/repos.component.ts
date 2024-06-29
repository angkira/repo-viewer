import {
  ChangeDetectionStrategy,
  Component,
  WritableSignal,
  signal,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable, merge } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Repo } from './Repo';
import { RepoRequestParams, ReposService } from './repos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'rw-repos',
  templateUrl: './repos.component.html',
  styleUrl: './repos.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReposComponent {
  params$: Observable<RepoRequestParams> = this.route.queryParams.pipe(
    map((params) => ({
      query: params['query'] || '',
      paging: { page: +params['page'] || 1, perPage: +params['perPage'] || 20 },
      filter: {
        minStars: +params['minStars'] || null,
        language: params['language'] || null,
      },
      sorting: params['sorting'] || 'stars',
      ordering: params['ordering'] || 'desc',
    })),
  );

  result$: Observable<Repo[]> = this.params$.pipe(distinctUntilChanged()).pipe(
    tap(console.log),
    filter((params) => params !== null && params.query !== ''),
    tap(() => this.loading.set(true)),
    switchMap((params) =>
      this.reposService.search(params as RepoRequestParams),
    ),
    tap(() => setTimeout(() => this.loading.set(false), 100)),
  );

  loading: WritableSignal<boolean> = signal(true);

  constructor(
    private reposService: ReposService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  onParamsChange(params: RepoRequestParams): void {
    if (!params.query) {
      return;
    }

    const paramsToFlat = (
      entity: object,
      result: Record<string, object | string | number> = {},
    ) =>
      Object.entries(entity).reduce((acc, [key, value]) => {
        if (typeof value === 'object' && value !== null) {
          paramsToFlat(value, result);
        } else {
          acc[key] = value;
        }
        return acc;
      }, result);

    console.log(paramsToFlat(params));

    this.router.navigate([], {
      queryParams: paramsToFlat(params),
      queryParamsHandling: 'merge',
    });
  }
}
