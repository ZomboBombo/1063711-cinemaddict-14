import { createUserRankTemplate }       from './view/user-rank.js';
import { createSiteMenuTemplate }       from './view/site-menu.js';
import { createFilmsSectionTemplate }   from './view/films-section.js';
import { createFilmsListTemplate }      from './view/films-list.js';
import { createFilmsListExtraTemplate } from './view/films-list-extra.js';
import { createFilmCardTemplate }       from './view/film-card.js';
import { createButtonShowMoreTemplate } from './view/button-show-more.js';
import { createPopupAboutFilmTemplate } from './view/popup-about-film.js';

import { generateFilmCard }             from './mock/fake-film-card.js';


// ----------- CONSTANTS -----------
const ELEMENT_PLACE = 'beforeend';
const POPUP_PLACE = 'afterend';
const FILMS_COUNT = 5;
const EXTRA_FILMS_COUNT = 2;

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


/*
 * Main components rendering:
 * ---
 * 1) user rank;
 * 2) site menu;
 * 3) section for films list;
 */
render(siteHeader, createUserRankTemplate(), ELEMENT_PLACE);
render(siteMainContent, createSiteMenuTemplate(), ELEMENT_PLACE);
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
const filmsListContainer = filmsListAll.querySelector('.films-list__container');

// *** Array with temporary film cards ***
const filmCards = new Array(FILMS_COUNT).fill().map(generateFilmCard);
for (let i = 0; i < FILMS_COUNT; i++) {
  render(filmsListContainer, createFilmCardTemplate(filmCards[i]), ELEMENT_PLACE);
}


// *** Rendering of «Show more» button ***
render(filmsListAll, createButtonShowMoreTemplate(), ELEMENT_PLACE);


/*
 * «Top rated» and «Most commented» lists items rendering
 */
const filmsListTopRated = filmsSection.querySelector('#top-rated .films-list__container');
const filmsListMostCommented = filmsSection.querySelector('#most-commented .films-list__container');
for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  render(filmsListTopRated, createFilmCardTemplate(), ELEMENT_PLACE);
  render(filmsListMostCommented, createFilmCardTemplate(), ELEMENT_PLACE);
}


/*
 * Film description popup rendering
 */
render(siteMainFooter, createPopupAboutFilmTemplate(), POPUP_PLACE);
