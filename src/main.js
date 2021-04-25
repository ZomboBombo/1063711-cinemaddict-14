import { createUserRankTemplate }       from './view/user-rank.js';
import { createSiteMenuTemplate }       from './view/site-menu.js';
import { createFilmsSectionTemplate }   from './view/films-section.js';
import { createFilmsListTemplate }      from './view/films-list.js';
import { createFilmsListExtraTemplate } from './view/films-list-extra.js';
import { createFilmCardTemplate }       from './view/film-card.js';
import { createButtonShowMoreTemplate } from './view/button-show-more.js';
import { createPopupAboutFilmTemplate } from './view/popup-about-film.js';

import { generateFilmCard }             from './mock/fake-data-film-card.js';
import { generateSiteMenu }             from './mock/fake-data-site-menu.js';


// ----------- CONSTANTS -----------
const FIRST_ARRAY_ELEMENT = 0;
const ZERO_LENGTH = 0;

const ELEMENT_PLACE = 'beforeend';
const POPUP_PLACE = 'afterend';

const FILMS_COUNT = 7;
const MAX_SHOWN_FILMS_COUNT = 5;
const EXTRA_FILMS_COUNT = 2;

const DISPLAY_NONE = 'display: none';

const FilmsListExtraId = {
  TOP_RATED: 'top-rated',
  MOST_COMMENTED: 'most-commented',
};

const FilmsListExtraTitle = {
  TOP_RATED: 'Top rated',
  MOST_COMMENTED: 'Most commented',
};


// ---------- Main DOM-elements ---------
const siteHeader = document.querySelector('.header');
const siteMainContent = document.querySelector('.main');
const siteMainFooter = document.querySelector('.footer');


/*
=============================================================
--------------------------- LOGIC ---------------------------
=============================================================
*/

// *** Function for rendering components to site page ***
function render (container, template, elementPlace) {
  container.insertAdjacentHTML(elementPlace, template);
}


// *** Array with temporary film cards ***
const filmCards = new Array(FILMS_COUNT).fill().map(generateFilmCard);
const siteMenuFilters = generateSiteMenu(filmCards);


/*
 * Main components rendering:
 * ---
 * 1) user rank;
 * 2) site menu;
 * 3) section for films list;
 */
render(siteHeader, createUserRankTemplate(), ELEMENT_PLACE);
render(siteMainContent, createSiteMenuTemplate(siteMenuFilters), ELEMENT_PLACE);
render(siteMainContent, createFilmsSectionTemplate(), ELEMENT_PLACE);


/*
 * Films list templates rendering:
 * ---
 * 1) template of «All movies»;
 * 2) template of «Top rated»;
 * 3) template of «Most commented»;
 */
const filmsSection = siteMainContent.querySelector('.films');
render(filmsSection, createFilmsListTemplate(), ELEMENT_PLACE);
render(filmsSection, createFilmsListExtraTemplate(FilmsListExtraId.TOP_RATED, FilmsListExtraTitle.TOP_RATED), ELEMENT_PLACE);
render(filmsSection, createFilmsListExtraTemplate(FilmsListExtraId.MOST_COMMENTED, FilmsListExtraTitle.MOST_COMMENTED), ELEMENT_PLACE);


/*
 * «All movies» list items rendering
 */
const filmsListAll = filmsSection.querySelector('#all-movies');
const filmsListAllContainer = filmsListAll.querySelector('.films-list__container');


// *** Function of rendering the remaining film cards ***
function filmCardsRendering () {
  // --- Count of remaining film cards ---
  const filmCardsToRender = filmCards.length < MAX_SHOWN_FILMS_COUNT
    ? filmCards.length
    : MAX_SHOWN_FILMS_COUNT;


  for (let i = 0; i < filmCardsToRender; i++) {
    render(filmsListAllContainer, createFilmCardTemplate(filmCards[i]), ELEMENT_PLACE);
  }

  filmCards.splice(FIRST_ARRAY_ELEMENT, filmCardsToRender);
};

// *** First call of function for film cards rendering ***
filmCardsRendering();


// *** Rendering of «Show more» button ***
render(filmsListAll, createButtonShowMoreTemplate(), ELEMENT_PLACE);


/*
 * «Top rated» and «Most commented» lists items rendering
 */
const filmsListTopRated = filmsSection.querySelector('#top-rated .films-list__container');
const filmsListMostCommented = filmsSection.querySelector('#most-commented .films-list__container');
for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  render(filmsListTopRated, createFilmCardTemplate(filmCards[i]), ELEMENT_PLACE);
  render(filmsListMostCommented, createFilmCardTemplate(filmCards[i]), ELEMENT_PLACE);
}


/*
 * Film description popup rendering
 */
render(siteMainFooter, createPopupAboutFilmTemplate(), POPUP_PLACE);



/*
 * *** The logic of displaying additional movie cards when you click on the "Show more" button ***
 */

const showMoreButton = document.querySelector('#show-more-button');

// *** Function for event listener of "Show more" button ***
function showMoreFilmCards (clickEvt) {
  clickEvt.preventDefault();

  filmCardsRendering();

  if (filmCards.length === ZERO_LENGTH) {
    showMoreButton.style = DISPLAY_NONE;
    showMoreButton.removeEventListener('click', showMoreFilmCards);
  }
};

showMoreButton.addEventListener('click', showMoreFilmCards);
