import { generateElement } from '../utils.js';


const createButtonShowMoreTemplate = () => {
  return '<button class="films-list__show-more" id="show-more-button">Show more</button>';
};


export default class ShowMoreButton {
  constructor () {
    this._element = null;
  }


  getTemplate () {
    return createButtonShowMoreTemplate();
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
