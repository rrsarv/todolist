import TaskComponent from '../view/task-component.js';
import { render } from '../framework/render.js';

export default class TaskPresenter {
  #task = null;
  #container = null;
  #taskComponent = null;

  constructor({ task, container }) {
    this.#task = task;
    this.#container = container;

  }

  init() {
    this.#taskComponent = new TaskComponent({ task: this.#task });
    render(this.#taskComponent, this.#container);
  }

}