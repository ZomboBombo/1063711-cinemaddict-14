import { generateElement } from '../utils/render.js';


export default class Abstract {
  constructor () {
    if (new.target === Abstract) {
      throw new Error('Невозможно создать экземпляр класса Abstract. Создавать допускается только экземпляр конкретного класса.');
    }

    this._element = null;
    this._callback = {};
  }


  getTemplate () {
    throw new Error('Абстрактный метод не реализован: getTemplate()');
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
