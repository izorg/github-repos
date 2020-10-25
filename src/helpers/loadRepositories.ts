import { Repository } from './types';

const loadRepositories = async (): Promise<Repository[]> => {
  const now = new Date();
  const lastWeek = new Date(now);

  lastWeek.setDate(now.getDate() - 7);

  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=created:>${lastWeek.toISOString()}&sort=stars&order=desc&per_page=100`,
    );

    const json = await response.json();

    return json.items;
  } catch (e) {
    throw new Error('Unable to load repositories');
  }
};

export default loadRepositories;
