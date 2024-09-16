import {createElement} from '../framework/render.js';


function createDoneComponentTemplate() {
    return (
      
      `

           <div class="done"> 
            <ul class="list_done">
                <label>Готово</label>
                <li class="task">Позвонить маме</li>
                <li class="task">Погладить кота</li>
            </ul>
        </div>
    `

      );
}


export default class DoneComponent {
  getTemplate() {
    return createDoneComponentTemplate();
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
