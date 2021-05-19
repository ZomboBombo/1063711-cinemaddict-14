import AbstractView from './abstract.js';


// *** Function for creating "Show more" button template  ***
const createButtonShowMoreTemplate = () => {
  return '<button class="films-list__show-more" id="show-more-button">Show more</button>';
};


export default class ShowMoreButton extends AbstractView {
  getTemplate () {
    return createButtonShowMoreTemplate();
  }
}
