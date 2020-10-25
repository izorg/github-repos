import { Repository } from './types';

const getLanguagesFromRepositories = (repositories: Repository[]): string[] => {
  const languages = repositories.map((repository) => repository.language);

  return [...new Set(languages)]
    .filter((language): language is string => typeof language === 'string')
    .sort();
};

export default getLanguagesFromRepositories;
