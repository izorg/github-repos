const languageSelect = document.getElementById(
  'language-select',
) as HTMLSelectElement;

const languageFilterSheet = document.head.appendChild(
  document.createElement('style'),
);

const initLanguageFilter = (list: HTMLElement, languages: string[]) => {
  languageSelect.addEventListener('change', (event) => {
    const { value } = event.target as HTMLInputElement;

    list.dataset.language = value;
  });

  languageFilterSheet.textContent = languages
    .map(
      (language) => `
        .RepositoryList[data-language="${language}"] .RepositoryListItem:not([data-language="${language}"]) {
            display: none;
        }`,
    )
    .join('');

  const languageOptions = languages.map((language) => {
    const el = document.createElement('option');

    el.textContent = language;

    return el;
  });

  const options = new DocumentFragment();

  options.append(...languageOptions);

  languageSelect.appendChild(options);
};

export default initLanguageFilter;
