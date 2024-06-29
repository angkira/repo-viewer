import { Injectable } from '@angular/core';
import { Octokit } from '@octokit/rest';
import { Commit } from './Commit';
import { Observable, from, map } from 'rxjs';

export type Paging = {
  page: number;
  perPage: number;
};

@Injectable({
  providedIn: 'root',
})
export class CommitsService {
  private octokit: Octokit;

  constructor() {
    this.octokit = new Octokit();
  }

  search(query: string, paginig: Paging): Observable<Commit[]> {
    return from(
      this.octokit.search.commits({
        q: query,
        per_page: paginig.perPage,
        page: paginig.page,
      }),
    ).pipe(map((response) => response.data.items));
  }
}
