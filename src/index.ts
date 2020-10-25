import createRepositoryNode from './helpers/createRepositoryNode';
import formatStars from './helpers/formatStars';
import loadRepositories from './helpers/loadRepositories';
import {
  loadStarredRepositories,
  saveStarredRepositories,
} from './helpers/starredRepositories';
import getLanguagesFromRepositories from './helpers/getLanguagesFromRepositories';
import initLanguageFilter from './helpers/initLanguageFilter';
import initStarredFilter from './helpers/initStarredFilter';

const list = document.getElementById('list') as HTMLElement;
const info = document.getElementById('info') as HTMLElement;

loadRepositories()
  .then((repositories) => {
    initStarredFilter(list);

    const languages = getLanguagesFromRepositories(repositories);

    initLanguageFilter(list, languages);

    const starredRepositories = loadStarredRepositories();

    const listItems = repositories.map((repository) =>
      createRepositoryNode(repository, starredRepositories[repository.id]),
    );

    const fragment = new DocumentFragment();

    fragment.append(...listItems);
    list.appendChild(fragment);

    list.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;

      if (!target.closest('.btn--star')) {
        return;
      }

      const item = target.closest('.RepositoryListItem') as HTMLElement;
      const starred = item.classList.toggle('RepositoryListItem--starred');

      const starredRepositories = loadStarredRepositories();

      saveStarredRepositories({
        ...starredRepositories,
        [item.dataset.id as string]: starred || undefined,
      });

      const starsNode = item.querySelector('.stars') as HTMLElement;

      const stars = Number(starsNode.dataset.stars) + (starred ? 1 : -1);

      starsNode.dataset.stars = stars.toString();
      starsNode.textContent = formatStars(stars);
    });

    list.removeChild(info);
  })
  .catch((error) => {
    (document.getElementById('loader') as HTMLElement).hidden = true;

    const errorElement = document.getElementById('error') as HTMLElement;

    errorElement.hidden = false;
    errorElement.textContent = error.toString();
  });
