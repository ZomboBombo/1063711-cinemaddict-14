import { humanizeDate } from '../utils.js';


export const createFilmCardTemplate = (filmCard) => {
  const {
    poster,
    inWatchlist,
    alreadyWatched,
    isFavorite,
    name,
    rate,
    manufactureDate,
    duration,
    genre,
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

  const filmDurationHour = humanizeDate(duration, 'h');
  const filmDurationMinutes = humanizeDate(duration, 'mm');

  return `
    <article class="film-card">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${rate}</p>
      <p class="film-card__info">
        <span class="film-card__year">${manufactureDate}</span>
        <span class="film-card__duration">${filmDurationHour}h ${filmDurationMinutes}m</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="${poster}" alt="Постер к фильму: «${name}»" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${wathclistClassName}" type="button" title="Add to watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${alreadyWatchedClassName}" type="button" title="Mark as watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteClassName}" type="button" title="Mark as favorite">Mark as favorite</button>
      </div>
    </article>
  `;
};
