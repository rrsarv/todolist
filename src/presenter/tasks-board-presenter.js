import TasksListComponent from '../view/tasks-list-component.js';
import TaskComponent from '../view/task-component.js';
import TaskBoardComponent from '../view/tasks-board-component.js';
import {render} from '../framework/render.js';
import { Status} from '../const.js';

export default class TasksBoardPresenter {

 tasksBoardComponent = new TaskBoardComponent();
 


 constructor({boardContainer, tasksModel}) {
   this.boardContainer = boardContainer;
   this.tasksModel = tasksModel;
 }


 init() {  this.boardTasks = [...this.tasksModel.getTasks()];
  render(this.tasksBoardComponent, this.boardContainer);    
  for (let el in Status) {  this.status_title = Status[el];
   const tasksListComponent = new TasksListComponent({status: Status[el]});
      render(tasksListComponent, this.tasksBoardComponent.getElement());
      for (let j = 0; j <  this.boardTasks.length; j++) {         const taskComponent = new TaskComponent({task: this.boardTasks[j]});
                  if (this.boardTasks[j].status == this.status_title)
          {         render(taskComponent, tasksListComponent.getElement());
          }     }
  }

 }
}
