const createSiteMenuFilterTemplate = (filter, isActive) => {
  const { name, count } = filter;

  return (
    `
      <a href="#${name}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>
    `
  );
};


export const createSiteMenuTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems.map((filter, index) => createSiteMenuFilterTemplate(filter, index === 0)).join('');

  return `
    <nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item">All movies</a>
        ${filterItemsTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional main-navigation__additional--active">Stats</a>
    </nav>
  `;
};
