import formatStars from './formatStars';
import { Repository } from './types';

const template = document.getElementById('list-item') as HTMLTemplateElement;

const createRepositoryNode = (
  repository: Repository,
  starred = false,
): DocumentFragment => {
  const clone = document.importNode(template.content, true);

  const item = clone.querySelector('.RepositoryListItem') as HTMLElement;

  item.dataset.id = repository.id.toString();

  if (repository.language) {
    item.dataset.language = repository.language;
  }

  if (starred) {
    item.classList.add('RepositoryListItem--starred');
  }

  (clone.querySelector('.repository-link') as HTMLAnchorElement).href =
    repository.html_url;

  (clone.querySelector('.owner-name') as HTMLElement).textContent =
    repository.owner.login;

  (clone.querySelector('.repository-name') as HTMLElement).textContent =
    repository.name;

  (clone.querySelector('.description') as HTMLElement).textContent =
    repository.description;

  (clone.querySelector('.language') as HTMLElement).textContent =
    repository.language;

  const starsNode = clone.querySelector('.stars') as HTMLElement;
  const stars = repository.stargazers_count + (starred ? 1 : 0);

  starsNode.dataset.stars = stars.toString();
  starsNode.textContent = formatStars(stars);

  return clone;
};

export default createRepositoryNode;
