import { AbstractComponent } from "../framework/view/abstract-component.js";
import { StatusLabel } from "../const.js";

function createTasksListComponentTemplate(status) {
    return (
      
      `       
      <ul class="list_${status}">
                      <label>${StatusLabel[status]}</label> 
        </ul>
     
    `

      );
}


export default class tasksListComponent extends AbstractComponent {
  status;

  constructor({ status,onTaskDrop }) {
    super();
    this.status = status;
    this.#setDropHandler(onTaskDrop);
  }

  get template() {  
      return createTasksListComponentTemplate(this.status);
  }



#setDropHandler(onTaskDrop) {
  const container = this.element;
  container.addEventListener('dragover',(event)=>{
    event.preventDefault();
  });
  
  container.addEventListener('drop',(event)=>{
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/plain');
    onTaskDrop(taskId,this.status);
  })
 }
}
