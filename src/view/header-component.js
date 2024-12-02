import { AbstractComponent } from "../framework/view/abstract-component.js";


function createHeaderComponentTemplate() {
    return (
      
      `
            <h1> Список задач</h1>
    `

      );
}


export default class HeaderComponent extends AbstractComponent {
  constructor() {
    super();
  }
  
  get template() {
    return createHeaderComponentTemplate();
  }



}
