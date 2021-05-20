import Abstract from '../view/abstract.js';


// *** Glossary for element positions ***
export const RenderPosition = {
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};


// *** Function for rendering elements ***
export const renderElement = (container, element, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (element instanceof Abstract) {
    element = element.getElement();
  }

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


// *** Function for remove components ***
export const removeComponent = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error ('Удалять можно только компоненты.');
  }

  component.getElement().remove();
  component.removeElement();
};
