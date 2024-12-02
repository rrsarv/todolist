import { AbstractComponent } from "../framework/view/abstract-component.js";


function createTaskBoardTemplate() {
  return (
      
      `
            <div class ="tasks_blok"> 
                     
                    </div>
    `

      );
}


export default class TaskBoard extends AbstractComponent {

  get template() {
    return createTaskBoardTemplate();
  }


  
}
