import TasksListComponent from '../view/tasks-list-component.js';
import SubmitTaskComponent from '../view/submitTask-component.js'
import TaskBoardComponent from '../view/tasks-board-component.js';
import { Status } from '../const.js';
import ClearButtonComponent from "../view/button-clear.js";
import { render } from '../framework/render.js';
import TaskPresenter from './task-presenter.js';



export default class TasksBoardPresenter {
  #boardContainer=null;
  #tasksBoardComponent;
  #tasksModel=null;


 constructor({boardContainer, tasksModel}) {
  this.#boardContainer = boardContainer;
  this.#tasksModel=tasksModel;
  this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
 }

 init() {
  this.#renderBoard();
  }
  #renderBoard(){
    this.#tasksBoardComponent = new TaskBoardComponent();
    render(this.#tasksBoardComponent, this.#boardContainer);  
      for (let el in Status) {
        this.status_title = Status[el];
        if(this.status_title !=='garbage'){
          this.#renderTasksList(Status[el],this.#tasksBoardComponent.element)
        }
        else{
          this.#renderGarbageList(this.status_title,this.#tasksBoardComponent.element)
        }
      }
    }

  #renderTasksList(status_title,container){
    const tasksListComponent = new TasksListComponent({status: status_title, onTaskDrop: this.#handleTaskDrop.bind(this)});
    render(tasksListComponent,container);
    const tasksForStatus = this.#tasksModel.getTasksByStatus(
      this.status_title
    );

  if (tasksForStatus.length===0){
    render(new SubmitTaskComponent(), tasksListComponent.element);
    }
  else{

    tasksForStatus.forEach(elem =>{
      this.#renderTask( elem,tasksListComponent.element);          
    })
    }
  }
  #renderTask(task, container) {
    const taskPresenter = new TaskPresenter({task,container})
    taskPresenter.init(); 
  }  

  #renderGarbageList(status_title,container){
     const tasksListComponent=new TasksListComponent({status:status_title,onTaskDrop: this.#handleTaskDrop.bind(this)})
    render(tasksListComponent,container);
    const tasksForStatus = this.#tasksModel.getTasksByStatus(
      this.status_title
    );
    if (tasksForStatus.length===0){
      render(new SubmitTaskComponent(), tasksListComponent.element);
      }
    else{
      tasksForStatus.forEach(elem =>{
        this.#renderTask( elem,tasksListComponent.element);          
      })
      }
      this.makeClearButton();
  }
  createTask() {
    const taskTitle = document.querySelector("#add-task").value.trim();
    if (!taskTitle) {
      return;
    }
    this.#tasksModel.addTask(taskTitle);
    document.querySelector("#add-task").value = '';
  }
  makeClearButton(){
    const basketContainer = document.querySelector(`.list_${Status.BASKET}`);

    const clearButtonComponent = new ClearButtonComponent({
      onClick: () => this.#clearGarbage(),
    });

    render(clearButtonComponent, basketContainer);
  }
  #handleModelChange(){
    this.#clearBoard();
    this.#renderBoard();
  }


  #handleTaskDrop(taskId,newStatus){
    this.#tasksModel.updateTaskStatus(taskId,newStatus)
    console.log(newStatus)
  }


  #clearBoard(){
    this.#boardContainer.innerHTML='';
  }
  #clearGarbage() {  
    this.#tasksModel.clearTasksByStatus(Status.BASKET);
    this.#handleModelChange();
  }
}