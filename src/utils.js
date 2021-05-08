import dayjs from 'dayjs';


/*
 * *** Util function to generate a random number from a range
 * *** Source: https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
 */
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};


// *** Boolean flag: is property active... ***
export const isActive = () => {
  return Boolean(getRandomInteger(0, 1));
};


// *** Function for humanization date ***
export const humanizeDate = (dateValue, dateFormat) => {
  return dayjs(dateValue).format(dateFormat);
};


// *** Glossary for element positions ***
export const RenderPosition = {
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};


// *** Function for rendering elements ***
export const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;

    case RenderPosition.AFTEREND:
      container.after(element);
      break;
  }
};


// *** Function for rendering components to site page ***
export const renderTemplate = (container, template, elementPlace) => {
  container.insertAdjacentHTML(elementPlace, template);
};


// *** Function for generating DOM-elements ***
export const generateElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};
