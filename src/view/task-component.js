import { AbstractComponent } from "../framework/view/abstract-component.js";


function createTaskComponentTemplate(task) {
  const{status,title}=task;
  return (
`        
        <li class="task--${status}">${title}</li>
        `
        );

}

 
  

  export default class TaskComponent extends AbstractComponent {

    constructor ({task}) {
      super();
        this.task = task;
    }

    get template() {
        return createTaskComponentTemplate (this.task);
    }


}



