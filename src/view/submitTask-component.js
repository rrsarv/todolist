import { AbstractComponent } from "../framework/view/abstract-component.js";

function createsubmitTaskComponentTemplate() {
  return `<li class="task-submit">Перетащите карточку</li>`;
}

export default class TaskComponent extends AbstractComponent {
  constructor() {
    super();
  }

  get template() {
    return createsubmitTaskComponentTemplate();
  }
}