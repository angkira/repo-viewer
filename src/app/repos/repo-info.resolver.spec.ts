import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { repoInfoResolver } from './repo-info.resolver';

describe('repoInfoResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => repoInfoResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
