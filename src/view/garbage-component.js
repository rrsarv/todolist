import {createElement} from '../framework/render.js';


function createGarbageComponentTemplate() {
    return (
      
      `
              <div class="garbage">
            <ul class="list_garbage">            
                <label>Корзина</label>
                <li class="task">Сходить погулять</li>
                <li class="task">Прочитать Войну и Мир</li>
                <button type="button">X Очистить</button>
            </ul>
        </div>
    `

      );
}


export default class GarbageComponent {
  getTemplate() {
    return createGarbageComponentTemplate();
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
