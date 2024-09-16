import {createElement} from '../framework/render.js';


function createFormComponentTemplate() {
    return (
      
      `

       <div class="input">
        <label>Новая задача</label>
        <form>
           <input name="text" placeholder="Название задачи...">
            <button type="button">+ Добавить</button>
         </form>
        </div>

    `

      );
}


export default class FormComponent {
  getTemplate() {
    return createFormComponentTemplate();
  }


  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }


    return this.element;
  }


  removeElement() {
    this.element = null;
  }
}
