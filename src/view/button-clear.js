import { AbstractComponent } from "../framework/view/abstract-component.js";

function createClearButtonComponentTemplate() {
  return `
                <button type="button">x Очистить</button>
        `;
}

export default class ClearButtonComponent extends AbstractComponent {
  #handleClick = null;

  constructor({ onClick }) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener("click", this.#clickHandler); 
  }

  get template() {
    return createClearButtonComponentTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}