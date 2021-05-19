import UserRankView from './view/user-rank.js';
import SiteMenuView from './view/site-menu.js';
import FilmsSectionView from './view/films-section.js';
import FilmsListView from './view/films-list.js';
import EmptyFilmsListView from './view/films-list-empty.js';
import FilmCardView from './view/film-card.js';
import ShowMoreButtonView from './view/button-show-more.js';
import FilmAboutPopup from './view/popup-about-film.js';

import { generateFilmCard } from './mock/fake-data-film-card.js';
import { generateSiteMenu } from './mock/fake-data-site-menu.js';

import { renderElement, RenderPosition } from './utils.js';


// ----------- CONSTANTS -----------
const FIRST_ARRAY_ELEMENT = 0;
const ZERO_LENGTH = 0;

const DISPLAY_NONE = 'display: none';

// *** Glossary for films count ***
const FilmsCount = {
  TOTAL: 17,
  MAX_SHOWN: 5,
  MAX_SHOWN_IN_EXTRA_LIST: 2,
};

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

// *** Glossary for «Escape» key properties ***
const EscapeKey = {
  FULL_NAME: 'Escape',
  ABBREVIATED_NAME: 'Esc',
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
const filmCards = new Array(FilmsCount.TOTAL).fill().map(generateFilmCard);
const siteMenuFilters = generateSiteMenu(filmCards);

/*
 * --- We need to copy the original array of cards
 * --- in order to perform various manipulations with it
 * --- (for example, deleting elements) without changing it.
 */
const copyOfFilmCardsArray = filmCards.slice();


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

if (filmCards.length === ZERO_LENGTH) {
  renderElement(filmsSection, new EmptyFilmsListView().getElement(), RenderPosition.BEFOREEND);
} else {
  renderElement(filmsSection, new FilmsListView(FilmsListSection.allMovies.id, FilmsListSection.allMovies.title).getElement(), RenderPosition.BEFOREEND);
  renderElement(filmsSection, new FilmsListView(FilmsListSection.topRated.id, FilmsListSection.topRated.title).getElement(), RenderPosition.BEFOREEND);
  renderElement(filmsSection, new FilmsListView(FilmsListSection.mostCommented.id, FilmsListSection.mostCommented.title).getElement(), RenderPosition.BEFOREEND);


  /*
   * «All movies» list items rendering
   */
  const filmsListAll = filmsSection.querySelector('#all-movies');
  const filmsListAllContainer = filmsListAll.querySelector('.films-list__container');


  // *** Handler for Film card elements click event ***
  const onFilmCardClick = (currentFilmCard) => {
    const filmAboutPopupComponent = new FilmAboutPopup(currentFilmCard);

    // --- Handler for «Escape» keydown event ---
    const onEscPress = (evt) => {
      evt.preventDefault();

      if (evt.key === EscapeKey.FULL_NAME || evt.key === EscapeKey.ABBREVIATED_NAME) {
        filmAboutPopupComponent.getElement().remove();
        filmAboutPopupComponent.removeElement();
        filmAboutPopupComponent.removeCloseButtonClickHandler(onCloseButtonClick);
        body.classList.remove('hide-overflow');
        document.removeEventListener('keydown', onEscPress);
      }
    };

    // --- Handler for Popup close button click event ---
    const onCloseButtonClick = () => {
      filmAboutPopupComponent.getElement().remove();
      filmAboutPopupComponent.removeElement();
      filmAboutPopupComponent.removeCloseButtonClickHandler(onCloseButtonClick);
      body.classList.remove('hide-overflow');
      document.removeEventListener('keydown', onEscPress);
    };


    filmAboutPopupComponent.addCloseButtonClickHandler(onCloseButtonClick);
    document.addEventListener('keydown', onEscPress);

    /*
     * Film description popup rendering
     */
    body.appendChild(filmAboutPopupComponent.getElement());
    body.classList.add('hide-overflow');
  };


  // *** Function of rendering a film card ***
  const renderFilmCard = (cardsContainer, card) => {
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
  };


  // *** Function of rendering the remaining film cards ***
  const remainingFilmCardsRendering = () => {
    // --- Count of remaining film cards ---
    const remainingCardsCount = copyOfFilmCardsArray.length < FilmsCount.MAX_SHOWN
      ? copyOfFilmCardsArray.length
      : FilmsCount.MAX_SHOWN;


    for (let i = 0; i < remainingCardsCount; i++) {
      renderFilmCard(filmsListAllContainer, copyOfFilmCardsArray[i]);
    }

    copyOfFilmCardsArray.splice(FIRST_ARRAY_ELEMENT, remainingCardsCount);
  };

  // *** First call of function for film cards rendering ***
  remainingFilmCardsRendering();


  /*
   * *** Rendering of «Show more» button ***
   */
  if (filmCards.length > FilmsCount.MAX_SHOWN) {
    const showMoreButtonComponent = new ShowMoreButtonView();
    renderElement(filmsListAll, showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

    /*
     * *** The logic of displaying additional movie cards when you click on the "Show more" button ***
     */

    // *** Function for event listener of "Show more" button ***
    const onShowMoreButtonClick = () => {
      remainingFilmCardsRendering();

      if (copyOfFilmCardsArray.length === ZERO_LENGTH) {
        showMoreButtonComponent.getElement().remove();
        showMoreButtonComponent.removeElement();
        showMoreButtonComponent.removeClickHandler(onShowMoreButtonClick);
      }
    };

    showMoreButtonComponent.addClickHandler(onShowMoreButtonClick);
  }


  /*
   * «Top rated» and «Most commented» lists items rendering
   */
  const filmsListTopRated = filmsSection.querySelector('#top-rated .films-list__container');
  const filmsListMostCommented = filmsSection.querySelector('#most-commented .films-list__container');

  const maxShownExtraFilmsCount = filmCards.length < FilmsCount.MAX_SHOWN_IN_EXTRA_LIST
    ? filmCards.length
    : FilmsCount.MAX_SHOWN_IN_EXTRA_LIST;

  for (let i = 0; i < maxShownExtraFilmsCount; i++) {
    renderFilmCard(filmsListTopRated, filmCards[i]);
    renderFilmCard(filmsListMostCommented, filmCards[i]);
  }
}
