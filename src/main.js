import HeaderComponent from './view/header-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import {render, RenderPosition} from './framework/render.js';
import TasksModel from './model/task-model.js';
import FormAddTaskComponent from './view/form-component.js';
import TasksApiService from './tasks-api-service.js';


const END_POINT ='https://673b5583339a4ce4451bca0a.mockapi.io'
const bodyContainer= document.querySelector('.header');
const formContainer= document.querySelector('.new_task');
const tasksBoardContainer = document.querySelector('.row');


const tasksModel = new TasksModel({
     tasksApiService: new TasksApiService(END_POINT)
   });
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