import { Injectable } from '@angular/core';
import { Octokit } from '@octokit/rest';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private octokit: Octokit;

  constructor() {
    this.octokit = new Octokit();
  }
}
