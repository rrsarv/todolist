import { generateId } from '../utils.js';
import { tasks } from '../mock/task.js';

export default class TasksModel {
 #boardtasks = tasks;
 #observers =[];

 get tasks() {
   return this.#boardtasks;
 }
 getTasksByStatus(status){
  return this.#boardtasks.filter(task=>task.status===status);
 }

 addTask(title){
  const newTask = {
    id: generateId(),
    title,
    status:'backlog',
  };

  this.#boardtasks.push(newTask);
  this._notifyObservers();
  return newTask;
 }
 clearTasksByStatus(status) {
  this.#boardtasks = this.#boardtasks.filter(task => task.status !== status);
}

 addObserver(observer){
  this.#observers.push(observer);
 }

 removeObserver(observer){
  this.#observers=this.#observers.filter((obs) => obs !== observer);
 }

 _notifyObservers(){
  this.#observers.forEach((observer) => observer());
 }
}
