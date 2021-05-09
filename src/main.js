import UserRankView from './view/user-rank.js';
import SiteMenuView from './view/site-menu.js';
import FilmsSectionView from './view/films-section.js';
import FilmsListView from './view/films-list.js';
import FilmCardView from './view/film-card.js';
import ShowMoreButtonView from './view/button-show-more.js';
import FilmAboutPopup from './view/popup-about-film.js';

import { generateFilmCard } from './mock/fake-data-film-card.js';
import { generateSiteMenu } from './mock/fake-data-site-menu.js';

import { renderElement, RenderPosition } from './utils.js';


// ----------- CONSTANTS -----------
const FIRST_ARRAY_ELEMENT = 0;
const ZERO_LENGTH = 0;

const FILMS_COUNT = 17;
const MAX_SHOWN_FILMS_COUNT = 5;
const EXTRA_FILMS_COUNT = 2;

const DISPLAY_NONE = 'display: none';

// *** Glossary for films list sections ***
const FilmsListSection = {
  allMovies: {
    id: 'all-movies',
    title: 'All movies. Upcoming',
  },

  topRated: {
    id: 'top-rated',
    title: 'Top rated',
  },
  mostCommented: {
    id: 'most-commented',
    title: 'Most commented',
  },
};


// ---------- Main DOM-elements ---------
const body = document.querySelector('body');
const siteHeader = body.querySelector('.header');
const siteMainContent = body.querySelector('.main');


/*
=============================================================
--------------------------- LOGIC ---------------------------
=============================================================
*/


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
renderElement(siteHeader, new UserRankView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainContent, new SiteMenuView(siteMenuFilters).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainContent, new FilmsSectionView().getElement(), RenderPosition.BEFOREEND);


/*
 * Films list templates rendering:
 * ---
 * 1) template of «All movies»;
 * 2) template of «Top rated»;
 * 3) template of «Most commented»;
 */
const filmsSection = siteMainContent.querySelector('.films');
renderElement(filmsSection, new FilmsListView(FilmsListSection.allMovies.id, FilmsListSection.allMovies.title).getElement(), RenderPosition.BEFOREEND);
renderElement(filmsSection, new FilmsListView(FilmsListSection.topRated.id, FilmsListSection.topRated.title).getElement(), RenderPosition.BEFOREEND);
renderElement(filmsSection, new FilmsListView(FilmsListSection.mostCommented.id, FilmsListSection.mostCommented.title).getElement(), RenderPosition.BEFOREEND);


/*
 * «All movies» list items rendering
 */
const filmsListAll = filmsSection.querySelector('#all-movies');
const filmsListAllContainer = filmsListAll.querySelector('.films-list__container');


// *** Handler for Film card elements click event ***
function onFilmCardClick (currentFilmCard) {
  const filmAboutPopupElement = new FilmAboutPopup(currentFilmCard).getElement();
  const filmAboutPopupCloseButton = filmAboutPopupElement.querySelector('#film-details-close-btn');

  // --- Handler for Popup close button click event ---
  function onCloseButtonClick (closeEvt) {
    closeEvt.preventDefault();

    body.removeChild(filmAboutPopupElement);
    body.classList.remove('hide-overflow');
    filmAboutPopupCloseButton.removeEventListener('click', onCloseButtonClick);
  }

  filmAboutPopupCloseButton.addEventListener('click', onCloseButtonClick);


  /*
   * Film description popup rendering
   */
  body.appendChild(filmAboutPopupElement);
  body.classList.add('hide-overflow');
}


// *** Function of rendering a film card ***
function renderFilmCard (cardsContainer, card) {
  const filmCardComponent = new FilmCardView(card);

  renderElement(cardsContainer, filmCardComponent.getElement(), RenderPosition.BEFOREEND);

  const filmCardPoster = filmCardComponent.getElement().querySelector('.film-card__poster');
  const filmCardTitle = filmCardComponent.getElement().querySelector('.film-card__title');
  const filmCardComments = filmCardComponent.getElement().querySelector('.film-card__comments');

  filmCardPoster.addEventListener('click', () => {
    onFilmCardClick(card);
  });

  filmCardTitle.addEventListener('click', () => {
    onFilmCardClick(card);
  });

  filmCardComments.addEventListener('click', () => {
    onFilmCardClick(card);
  });
}


// *** Function of rendering the remaining film cards ***
function remainingFilmCardsRendering () {
  // --- Count of remaining film cards ---
  const remainingCardsCount = filmCards.length < MAX_SHOWN_FILMS_COUNT
    ? filmCards.length
    : MAX_SHOWN_FILMS_COUNT;


  for (let i = 0; i < remainingCardsCount; i++) {
    renderFilmCard(filmsListAllContainer, filmCards[i]);
  }

  filmCards.splice(FIRST_ARRAY_ELEMENT, remainingCardsCount);
}

// *** First call of function for film cards rendering ***
remainingFilmCardsRendering();


// *** Rendering of «Show more» button ***
renderElement(filmsListAll, new ShowMoreButtonView().getElement(), RenderPosition.BEFOREEND);


/*
 * «Top rated» and «Most commented» lists items rendering
 */
const filmsListTopRated = filmsSection.querySelector('#top-rated .films-list__container');
const filmsListMostCommented = filmsSection.querySelector('#most-commented .films-list__container');
for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  renderFilmCard(filmsListTopRated, filmCards[i]);
  renderFilmCard(filmsListMostCommented, filmCards[i]);
}


/*
 * *** The logic of displaying additional movie cards when you click on the "Show more" button ***
 */
const showMoreButton = document.querySelector('#show-more-button');

// *** Function for event listener of "Show more" button ***
function showMoreFilmCards (clickEvt) {
  clickEvt.preventDefault();

  remainingFilmCardsRendering();

  if (filmCards.length === ZERO_LENGTH) {
    showMoreButton.style = DISPLAY_NONE;
    showMoreButton.removeEventListener('click', showMoreFilmCards);
  }
}

showMoreButton.addEventListener('click', showMoreFilmCards);
