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
  constructor({ status }) {
    super();
    this.status = status;
  }

  get template() {  
      return createTasksListComponentTemplate(this.status);
  }

}