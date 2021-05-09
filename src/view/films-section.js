import { generateElement } from '../utils.js';


// *** Function for creating films section template ***
const createFilmsSectionTemplate = () => {
  return '<section class="films"></section>';
};


export default class FilmsSection {
  constructor () {
    this._element = null;
  }


  getTemplate () {
    return createFilmsSectionTemplate();
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
