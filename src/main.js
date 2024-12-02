import HeaderComponent from './view/header-component.js';
import FormComponent from './view/form-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import {render, RenderPosition} from './framework/render.js';
import TasksModel from './model/task-model.js';
import FormAddTaskComponent from './view/form-component.js';



const bodyContainer= document.querySelector('.header');
const formContainer= document.querySelector('.new_task');
const tasksBoardContainer = document.querySelector('.row');


 const tasksModel = new TasksModel();
 const headerComponent = new HeaderComponent();
 const tasksBoardPresenter = new TasksBoardPresenter({
      boardContainer: tasksBoardContainer,
      tasksModel,
     });
   
const formAddTaskComponent = new FormAddTaskComponent({
      onClick: handleNewTaskButtonClick,
 });
      
function handleNewTaskButtonClick() {
          tasksBoardPresenter.createTask();
}


render(headerComponent, bodyContainer, RenderPosition.AFTERBEGIN);
render(formAddTaskComponent, formContainer, RenderPosition.AFTERBEGIN);


tasksBoardPresenter.init();