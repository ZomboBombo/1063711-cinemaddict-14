export const createFilmsListExtraTemplate = (extraFilmsListId, extraFilmsListTitle) => {
  return `
    <section class="films-list films-list--extra" id="${ extraFilmsListId }">
      <h2 class="films-list__title visually-hidden">${ extraFilmsListTitle }</h2>
      <div class="films-list__container"></div>
    </section>
  `;
};
