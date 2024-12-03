import TasksListComponent from '../view/tasks-list-component.js';
import SubmitTaskComponent from '../view/submitTask-component.js';
import TaskBoardComponent from '../view/tasks-board-component.js';
import ClearButtonComponent from "../view/button-clear.js";
import LoadingViewComponent from '../view/LoadingViewComponent.js';
import { Status} from '../const.js';
import { render, RenderPosition } from '../framework/render.js';
import TaskPresenter from './task-presenter.js';

export default class TasksBoardPresenter {
  #boardContainer=null;
  #tasksBoardComponent;
  #tasksModel=null;
  #loadingComponent;

 constructor({boardContainer, tasksModel}) {
   this.#boardContainer = boardContainer;
   this.#loadingComponent = new LoadingViewComponent();

   this.#tasksModel=tasksModel;
   this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
 }

 async init() {
  this.#loading();
  await this.#tasksModel.init();
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
      this.#closeLoading()
    }  
   

    #renderGarbageList(status_title,container){
      const tasksListComponent=new TasksListComponent({status:status_title,onTaskDrop: this.#handleTaskDrop.bind(this)})
      render(tasksListComponent,container);
      const tasksForStatus = this.#tasksModel.getTasksByStatus(
        this.status_title
      );
      if (tasksForStatus.length===0){
        render(new SubmitTaskComponent(), tasksListComponent.element);
        this.makeClearButton();
        const ClearButton = document.querySelector('#delite-btn');
        ClearButton.setAttribute('disabled','true')
        }
      else{
        tasksForStatus.forEach(elem =>{
          this.#renderTask( elem,tasksListComponent.element);   
       
        })
        this.makeClearButton();

        }
    }



    async createTask() {
      this.#loading();
      const taskTitle = document.querySelector("#add-task").value.trim();
      if (!taskTitle) {
        return;
      }
      try{
        await this.#tasksModel.addTask(taskTitle);
        document.querySelector("#add-task").value = '';
      }catch (err){
        console.error('Ошибка при создании задачи:', err);
      }
     
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

  async #handleTaskDrop(taskId,newStatus){
    this.#loading();
    try{
      await this.#tasksModel.updateTaskStatus(taskId,newStatus)
    }catch (err){
      console.error('Ошибка при обновлении статуса задачи;', err)
    }
  }
  #clearBoard(){
    this.#boardContainer.innerHTML='';
  }
  async #clearGarbage() { 
    this.#loading();
    try{
      await this.#tasksModel.clearGarbageTasks(Status.BASKET);
    } catch (err){
      console.error('Ошибка при очистке корзины:',err)
    }
  }


  #loading(){
    render (this.#loadingComponent,this.#boardContainer,RenderPosition.BEFOREBEGIN)
  }

  #closeLoading(){
    this.#loadingComponent.element.remove();
  }
}
