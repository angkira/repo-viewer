import { ID, Timestamp } from '../core/types/util.types';

export type Repo = {
  id: ID;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  created_at: Timestamp;
  updated_at: Timestamp;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
};
