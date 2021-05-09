import { generateElement } from '../utils.js';


// *** Function for creating films list template  ***
const createFilmsListTemplate = (filmsListId, filmsListTitle) => {
  // --- Mod for films list section class ---
  const filmsListClassMod = filmsListId !== 'all-movies'
    ? 'films-list--extra'
    : '';

  return `<section class="films-list ${filmsListClassMod}" id="${filmsListId}">
            <h2 class="films-list__title visually-hidden">${filmsListTitle}</h2>
            <div class="films-list__container"></div>
          </section>`;
};


export default class FilmsList {
  constructor (listId, listTitle) {
    this._listId = listId;
    this._listTitle = listTitle;
    this._element = null;
  }


  getTemplate () {
    return createFilmsListTemplate(this._listId, this._listTitle);
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
