import dayjs from 'dayjs';


export const createFilmCardTemplate = (filmCard) => {
  const {
    poster,
    name,
    rate,
    manufactureDate,
    duration,
    genre,
    description,
    comments,
  } = filmCard;

  const filmManufactureDate = dayjs(manufactureDate).format('YYYY');
  const filmDurationHour = dayjs(duration).format('h');
  const filmDurationMinutes = dayjs(duration).format('mm');

  return `
    <article class="film-card">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${rate}</p>
      <p class="film-card__info">
        <span class="film-card__year">${filmManufactureDate}</span>
        <span class="film-card__duration">${filmDurationHour}h ${filmDurationMinutes}m</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="${poster}" alt="Постер к фильму: «${name}»" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist film-card__controls-item--active" type="button">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--active" type="button">Mark as favorite</button>
      </div>
    </article>
  `;
};
