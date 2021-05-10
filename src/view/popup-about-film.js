import { humanizeDate, generateElement } from '../utils.js';


// ----------- CONSTANTS -----------
const GENRES_ELEMENTS_SPLITTER = ', ';


/*
 * *** Function to create a genres list template
 */
const createGenresListTemplate = (genre) => {
  return (
    `<span class="film-details__genre">${genre}</span>`
  );
};


/*
 * *** Function to create a comments list template
 */
const createCommentsListTemplate = (comment) => {
  const dateOfComment = humanizeDate(comment.date, 'YYYY/MM/DD HH:mm');

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="${comment.emoji}" width="55" height="55" alt="Emoji">
      </span>
      <div>
        <p class="film-details__comment-text">${comment.message}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.author}</span>
          <span class="film-details__comment-day">${dateOfComment}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};


const createPopupAboutFilmTemplate = (filmCard) => {
  const {
    poster,
    name,
    originalName,
    rate,
    director,
    writers,
    actors,
    releaseDate,
    duration,
    country,
    genresList,
    description,
    ageRating,
    comments,
  } = filmCard;


  const fullReleaseDate = humanizeDate(releaseDate, 'DD MMMM YYYY');

  const filmDurationHour = humanizeDate(duration, 'h');
  const filmDurationMinutes = humanizeDate(duration, 'mm');

  const genresListTitle = genresList.length > 1
    ? 'Genres'
    : 'Genre';

  /*
   * To populate the genre list template,
   * we need to convert the «genreslist» string to an array.
   */
  const genresListArray = genresList.split(GENRES_ELEMENTS_SPLITTER);
  const genresListTemplate = genresListArray.map((genre, index) => createGenresListTemplate(genre, index === 0)).join('');

  const commentsListTemplate = comments.map((comment, index) => createCommentsListTemplate(comment, index === 0)).join('');

  return `<section class="film-details">
            <form class="film-details__inner" action="" method="get">
              <div class="film-details__top-container">
                <div class="film-details__close">
                  <button type="button" class="film-details__close-btn" id="film-details-close-btn">close</button>
                </div>
                <div class="film-details__info-wrap">
                  <div class="film-details__poster">
                    <img class="film-details__poster-img" src="${poster}" alt="Постер к фильму: «${name}»">

                    <p class="film-details__age">${ageRating}</p>
                  </div>

                  <div class="film-details__info">
                    <div class="film-details__info-head">
                      <div class="film-details__title-wrap">
                        <h3 class="film-details__title">${name}</h3>
                        <p class="film-details__title-original">${originalName}</p>
                      </div>

                      <div class="film-details__rating">
                        <p class="film-details__total-rating">${rate}</p>
                      </div>
                    </div>

                    <table class="film-details__table">
                      <tr class="film-details__row">
                        <td class="film-details__term">Director</td>
                        <td class="film-details__cell">${director}</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Writers</td>
                        <td class="film-details__cell">${writers}</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Actors</td>
                        <td class="film-details__cell">${actors}</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Release Date</td>
                        <td class="film-details__cell">${fullReleaseDate}</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Runtime</td>
                        <td class="film-details__cell">${filmDurationHour}h ${filmDurationMinutes}m</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Country</td>
                        <td class="film-details__cell">${country}</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">${genresListTitle}</td>
                        <td class="film-details__cell">
                          ${genresListTemplate}
                        </td>
                      </tr>
                    </table>

                    <p class="film-details__film-description">
                      ${description}
                    </p>
                  </div>
                </div>

                <section class="film-details__controls">
                  <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
                  <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

                  <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
                  <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

                  <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
                  <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
                </section>
              </div>

              <div class="film-details__bottom-container">
                <section class="film-details__comments-wrap">
                  <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

                  <ul class="film-details__comments-list">
                    ${commentsListTemplate}
                  </ul>

                  <div class="film-details__new-comment">
                    <div class="film-details__add-emoji-label"></div>

                    <label class="film-details__comment-label">
                      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
                    </label>

                    <div class="film-details__emoji-list">
                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                      <label class="film-details__emoji-label" for="emoji-smile">
                        <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                      </label>

                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                      <label class="film-details__emoji-label" for="emoji-sleeping">
                        <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                      </label>

                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                      <label class="film-details__emoji-label" for="emoji-puke">
                        <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                      </label>

                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                      <label class="film-details__emoji-label" for="emoji-angry">
                        <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                      </label>
                    </div>
                  </div>
                </section>
              </div>
            </form>
          </section>`;
};


export default class FilmAboutPopup {
  constructor (filmCardElement) {
    this._filmCardElement = filmCardElement;
    this._element = null;
  }


  getTemplate () {
    return createPopupAboutFilmTemplate(this._filmCardElement);
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
