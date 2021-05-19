import AbstractView from './abstract.js';


// *** Function for creating films section template ***
const createFilmsSectionTemplate = () => {
  return '<section class="films"></section>';
};


export default class FilmsSection extends AbstractView {
  getTemplate () {
    return createFilmsSectionTemplate();
  }
}
