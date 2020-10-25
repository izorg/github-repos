const starredCheckbox = document.getElementById(
  'starred-checkbox',
) as HTMLInputElement;

const initStarredFilter = (list: HTMLElement) => {
  starredCheckbox.addEventListener('change', (event) => {
    list.classList.toggle(
      'RepositoryList--starred',
      (event.target as HTMLInputElement).checked,
    );
  });
};

export default initStarredFilter;
