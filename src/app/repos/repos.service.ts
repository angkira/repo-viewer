import { Injectable } from '@angular/core';
import { Octokit } from '@octokit/rest';
import { Repo } from './Repo';
import { Observable, from, map } from 'rxjs';
import { Nullable } from '../core/types/util.types';

export type Sorting = 'stars' | 'forks' | 'help-wanted-issues' | 'updated';

export type Ordering = 'desc' | 'asc';

export type Paging = {
  page: number;
  perPage: number;
};

export type Filtering = {
  minStars: Nullable<number>;
  language: Nullable<string>;
};

export type RepoRequestParams = {
  query: string;
  paging: Paging;
  filter: Filtering;
  sorting: Sorting;
  ordering: Ordering;
};

@Injectable({
  providedIn: 'root',
})
export class ReposService {
  private octokit: Octokit;

  constructor() {
    this.octokit = new Octokit();
  }

  parseFilterToQuery(filter?: Partial<Filtering>): string {
    if (!filter) return '';

    let query = '';

    if (filter.minStars && filter.minStars > 0) {
      query += `&stars:>${filter.minStars}`;
    }
    if (filter.language) {
      query += ` &language:${filter.language}`;
    }
    return query;
  }

  search({
    query,
    paging,
    filter,
    sorting,
    ordering,
  }: RepoRequestParams): Observable<Repo[]> {
    try {
      const response = from(
        this.octokit.search.repos({
          q: query + this.parseFilterToQuery(filter),
          page: paging.page,
          per_page: paging.perPage,
          sort: sorting,
          order: ordering,
        }),
      ).pipe(map((response) => response.data.items as Repo[]));

      return response;
    } catch (error) {
      console.error('Error searching repos:', error);

      throw error;
    }
  }

  /**
   * Gets repository information by ID.
   *
   * @param id - The ID of the repository.
   * @returns A promise that resolves to the repository information.
   * @throws If an error occurs while getting repository information.
   */
  getRepoById(id: string): Observable<Repo> {
    try {
      const response = from(
        this.octokit.request('GET /repositories/:id', { id }),
      ).pipe(map((response) => response.data as Repo));

      return response;
    } catch (error) {
      console.error('Error getting repo by ID:', error);

      throw error;
    }
  }
}
