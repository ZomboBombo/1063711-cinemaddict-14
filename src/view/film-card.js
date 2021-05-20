import AbstractView from './abstract.js';
import { humanizeDate } from '../utils/common.js';


// ----------- CONSTANTS -----------
const FIRST_LETTER_INDEX = 0;
const MAX_DESCRIPTION_LENGTH = 139;
const ELLIPSIS = '...';

const FIRST_ARRAY_ELEMENT = 0;
const GENRES_ELEMENTS_SPLITTER = ', ';


// *** Function for creating film card template  ***
const createFilmCardTemplate = (filmCard) => {
  const {
    poster,
    inWatchlist,
    alreadyWatched,
    isFavorite,
    name,
    rate,
    releaseDate,
    duration,
    genresList,
    description,
    comments,
  } = filmCard;


  const wathclistClassName = inWatchlist
    ? 'film-card__controls-item--active'
    : '';

  const alreadyWatchedClassName = alreadyWatched
    ? 'film-card__controls-item--active'
    : '';

  const favoriteClassName = isFavorite
    ? 'film-card__controls-item--active'
    : '';

  const filmReleaseDate = humanizeDate(releaseDate, 'YYYY');

  const filmDurationHour = humanizeDate(duration, 'h');
  const filmDurationMinutes = humanizeDate(duration, 'mm');

  const mainGenreOfFilm = genresList.split(GENRES_ELEMENTS_SPLITTER)[FIRST_ARRAY_ELEMENT];


  /*
   * --- Checking the length of the movie description:
   * --- if it more than 140 characters, the line is cut off
   * --- and an ellipsis is added.
   */
  let incompleteFilmDescription = description.substr(FIRST_LETTER_INDEX, MAX_DESCRIPTION_LENGTH);
  if (incompleteFilmDescription.length < description.length) {
    incompleteFilmDescription += ELLIPSIS;
  } else {
    incompleteFilmDescription = description;
  }

  return `<article class="film-card">
            <h3 class="film-card__title">${name}</h3>
            <p class="film-card__rating">${rate}</p>
            <p class="film-card__info">
              <span class="film-card__year">${filmReleaseDate}</span>
              <span class="film-card__duration">${filmDurationHour}h ${filmDurationMinutes}m</span>
              <span class="film-card__genre">${mainGenreOfFilm}</span>
            </p>
            <img src="${poster}" alt="Постер к фильму: «${name}»" class="film-card__poster">
            <p class="film-card__description">${incompleteFilmDescription}</p>
            <a class="film-card__comments">${comments.length} comments</a>
            <div class="film-card__controls">
              <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${wathclistClassName}" type="button" title="Add to watchlist">Add to watchlist</button>
              <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${alreadyWatchedClassName}" type="button" title="Mark as watched">Mark as watched</button>
              <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteClassName}" type="button" title="Mark as favorite">Mark as favorite</button>
            </div>
          </article>`;
};


export default class FilmCard extends AbstractView {
  constructor (filmCardElement) {
    super();

    this._filmCardElement = filmCardElement;
    this._element = null;
  }


  getTemplate () {
    return createFilmCardTemplate(this._filmCardElement);
  }
}
