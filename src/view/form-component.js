import { AbstractComponent } from "../framework/view/abstract-component.js";


function createFormAddTaskComponentTemplate() {
    return (
      
      `

       <div class="input">
        <label>Новая задача</label>
        <form>
          
             <input id="add-task" type="text" placeholder="Название задачи...">
              <button type="submit">+ Добавить</button>
         </form>
        </div>

    `

      );
}


export default class FormAddTaskComponent extends AbstractComponent {
  #handleClick = null;

  constructor({ onClick }) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener("submit", this.#clickHandler);
  }

  get template() {
    return createFormAddTaskComponentTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
  