import { generateElement } from '../utils.js';


// --------- CONSTANTS ---------
const FIRST_LETTER = 0;
const SECOND_LETTER = 1;


// *** Function for creating filter template  ***
const createSiteMenuFilterTemplate = (filter) => {
  const { name, count } = filter;
  const capitalizedName = name.charAt(FIRST_LETTER).toUpperCase() + name.slice(SECOND_LETTER);

  return (
    `<a href="#${name}" class="main-navigation__item">${capitalizedName} <span class="main-navigation__item-count">${count}</span></a>`
  );
};


// *** Function for creating site menu template ***
const createSiteMenuTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems.map((filter, index) => createSiteMenuFilterTemplate(filter, index === 0)).join('');

  return `<nav class="main-navigation">
            <div class="main-navigation__items">
              <a href="#all" class="main-navigation__item">All movies</a>
              ${filterItemsTemplate}
            </div>
            <a href="#stats" class="main-navigation__additional main-navigation__additional--active">Stats</a>
          </nav>`;
};


export default class SiteMenu {
  constructor (filters) {
    this._filters = filters;
    this._element = null;
  }


  getTemplate () {
    return createSiteMenuTemplate(this._filters);
  }


  getElement () {
    if (!this._element) {
      this._element = generateElement(this.getTemplate());
    }

    return this._element;
  }


  removeElement () {
    this._element = null;
  }
}
