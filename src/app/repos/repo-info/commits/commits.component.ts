import {
  ChangeDetectionStrategy,
  Component,
  WritableSignal,
  signal,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Observable, combineLatest } from 'rxjs';
import { debounceTime, map, switchMap, tap } from 'rxjs/operators';
import { Commit } from './Commit';
import { CommitsService, Paging } from './commits.service';

@Component({
  selector: 'rw-commits',
  templateUrl: './commits.component.html',
  styleUrl: './commits.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommitsComponent {
  searchBox = new FormControl();

  paging: WritableSignal<Paging> = signal({ page: 1, perPage: 20 });
  paging$: Observable<Paging> = toObservable(this.paging);

  query$: Observable<string> = this.searchBox.valueChanges.pipe(
    debounceTime(200),
    map((query) => query.trim()),
  );

  result$: Observable<Commit[]> = combineLatest(this.query$, this.paging$).pipe(
    tap(() => this.loading.set(true)),
    switchMap(([result, paging]) => this.commitsService.search(result, paging)),
    tap(() => setTimeout(() => this.loading.set(false), 100)),
  );

  loading: WritableSignal<boolean> = signal(true);

  constructor(
    private commitsService: CommitsService,
    private fb: FormBuilder,
  ) {}

  onPageChange(pageEvent: PageEvent): void {
    this.paging.set({
      ...this.paging(),
      ...{ page: pageEvent.pageIndex + 1, perPage: pageEvent.pageSize },
    });
  }
}
