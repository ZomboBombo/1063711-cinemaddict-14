import AbstractView from './abstract.js';


// *** Function for creating empty films list template  ***
const createEmptyFilmsListTemplate = () => {
  return `<section class="films-list">
            <h2 class="films-list__title">There are no movies in our database</h2>
          </section>`;
};


export default class EmptyFilmsList extends AbstractView {
  getTemplate () {
    return createEmptyFilmsListTemplate();
  }
}
