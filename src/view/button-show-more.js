import AbstractView from './abstract.js';


// *** Function for creating "Show more" button template  ***
const createButtonShowMoreTemplate = () => {
  return '<button class="films-list__show-more" id="show-more-button">Show more</button>';
};


export default class ShowMoreButton extends AbstractView {
  constructor () {
    super();

    this._clickHandler = this._clickHandler.bind(this);
  }


  getTemplate () {
    return createButtonShowMoreTemplate();
  }


  _clickHandler (evt) {
    evt.preventDefault();
    this._callback.click();
  }


  addClickHandler (callbackFunction) {
    this._callback.click = callbackFunction;
    this.getElement().addEventListener('click', this._clickHandler);
  }


  removeClickHandler (callbackFunction) {
    this._callback.click = callbackFunction;
    this.getElement().removeEventListener('click', this._clickHandler);
  }
}
