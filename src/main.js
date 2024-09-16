import HeaderComponent from './view/header-component.js';
import FormComponent from './view/form-component.js';
import BacklogComponent from './view/backlog-component.js';
import DoneComponent from './view/done-component.js';
import InProgressComponent from './view/in_progress-component.js';
import GarbageComponent from './view/garbage-component.js';
import {render, RenderPosition} from './framework/render.js';


const bodyContainer= document.querySelector('.header');
const formContainer= document.querySelector('.new_task');
const backlogContainer= document.querySelector('.backlog');
const inProgressContainer= document.querySelector('.in_progress');
const doneContainer= document.querySelector('.done');
const garbageContainer= document.querySelector('.garbage');



render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(new FormComponent(), formContainer, RenderPosition.AFTERBEGIN);
render(new BacklogComponent(), backlogContainer, RenderPosition.AFTERBEGIN);
render(new InProgressComponent(), inProgressContainer, RenderPosition.AFTERBEGIN);
render(new DoneComponent(), doneContainer, RenderPosition.AFTERBEGIN);
render(new GarbageComponent(), garbageContainer, RenderPosition.AFTERBEGIN);