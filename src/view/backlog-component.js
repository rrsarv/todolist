import {createElement} from '../framework/render.js';


function createBacklogComponentTemplate() {
    return (
      
      `

       <div class="backlog">
            <ul class="list_backlog">
                <label>Бэклог</label>
                <li class="task">Выучить JS</li>
                <li class="task">Выучить React</li>
                <li class="task">Сделать домашку</li>
            </ul>
        </div>

    `

      );
}


export default class BacklogComponent {
  getTemplate() {
    return createBacklogComponentTemplate();
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
