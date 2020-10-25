export type Owner = {
  login: string;
};

export type Repository = {
  description: null | string;
  html_url: string;
  id: number;
  language: null | string;
  name: string;
  owner: Owner;
  stargazers_count: number;
};
