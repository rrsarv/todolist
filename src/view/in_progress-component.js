import {createElement} from '../framework/render.js';


function createInProgressComponentTemplate() {
    return (
      
      `

        <div class="in_progress">
            <ul class="list_in_progress">
                <label>В процессе</label>
                <li class="task">Выпить смузи</li>
                <li class="task">Попить воды</li>
            </ul>
        </div>

    `

      );
}


export default class InProgressComponent {
  getTemplate() {
    return createInProgressComponentTemplate();
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
