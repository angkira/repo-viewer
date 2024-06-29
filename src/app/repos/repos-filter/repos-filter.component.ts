import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  WritableSignal,
  signal,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import {
  Filtering,
  Ordering,
  Paging,
  RepoRequestParams,
  Sorting,
} from '../repos.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'rw-repos-filter',
  templateUrl: './repos-filter.component.html',
  styleUrl: './repos-filter.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReposFilterComponent {
  @Input()
  set params(value: RepoRequestParams | null) {
    if (!value) return;

    if (value.query !== this.searchBox.value) {
      this.searchBox.setValue(value.query);
    }

    if (value.paging !== this.paging()) {
      this.paging.set(value.paging);
    }

    if (value.filter !== this.filterForm.value) {
      this.filterForm.setValue(value.filter);
    }

    if (value.sorting !== this.sorting()) {
      this.sorting.set(value.sorting);
    }

    if (value.ordering !== this.ordering()) {
      this.ordering.set(value.ordering);
    }

    if (value.paging !== this.paging()) {
      this.paging.set(value.paging);
    }
  }

  searchBox = new FormControl();

  query$: Observable<string> = this.searchBox.valueChanges.pipe(
    map((query) => query?.trim()),
  );

  sorting: WritableSignal<Sorting> = signal('stars');
  sorting$: Observable<Sorting> = toObservable(this.sorting);

  ordering: WritableSignal<Ordering> = signal('desc');
  ordering$: Observable<Ordering> = toObservable(this.ordering);

  paging: WritableSignal<Paging> = signal({ page: 1, perPage: 20 });
  paging$: Observable<Paging> = toObservable(this.paging);

  onPageChange(pageEvent: PageEvent): void {
    this.paging.set({
      ...this.paging(),
      ...{ page: pageEvent.pageIndex + 1, perPage: pageEvent.pageSize },
    });
  }

  filterForm = this.fb.group<Filtering>({
    minStars: 0,
    language: '',
  });

  filter$ = this.filterForm.valueChanges.pipe(startWith(this.filterForm.value));

  @Output('paramsChange')
  params$: Observable<RepoRequestParams> = combineLatest([
    this.query$,
    this.paging$,
    this.filter$,
    this.sorting$,
    this.ordering$,
  ]).pipe(
    debounceTime(300),
    map(([query, paging, filter, sorting, ordering]) => ({
      query,
      paging,
      filter: filter as Filtering,
      sorting,
      ordering,
    })),
  );

  constructor(private fb: FormBuilder) {}
}
