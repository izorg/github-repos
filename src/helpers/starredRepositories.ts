const storageKey = 'starred';

export const loadStarredRepositories = (): Record<string, true> => {
  const item = localStorage.getItem(storageKey);

  if (!item) {
    return {};
  }

  return JSON.parse(item);
};

export const saveStarredRepositories = (
  starredRepositories: Record<string, true | undefined>,
) => {
  localStorage.setItem(storageKey, JSON.stringify(starredRepositories));
};
