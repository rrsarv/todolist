import Observable from '../framework/observable.js';
import { generateId } from '../utils.js';

import { UserAction } from '../const.js';


export default class TasksModel extends Observable{
  #tasksApiService = null;
  #boardtasks = [];
 
 
  constructor({tasksApiService}) {
    super();
    this.#tasksApiService = tasksApiService;
 
 
    this.#tasksApiService.tasks.then((tasks) => {
      console.log(tasks);
    });
  }
 

  get tasks() {
    console.log("dsd");

    return this.#boardtasks;
  }
  async init() {
    try {
      const tasks = await this.#tasksApiService.tasks;
      this.#boardtasks = tasks;
    } catch(err) {
      this.#boardtasks = [];
    }
  }
  getTasksByStatus(status){
    return this.#boardtasks.filter(task=>task.status===status);
   }
  
   async addTask(title) {
    const newTask = {
      title,
      status: 'backlog',
      id: generateId(),
    };
    try {
      const createdTask = await this.#tasksApiService.addTask(newTask);
      this.#boardtasks.push(createdTask);
      this._notify(UserAction.ADD_TASK, createdTask);
      return createdTask;
    } catch (err) {
      console.error('Ошибка при добавлении задачи на сервер:', err);
      throw err;
    }
  }

  async updateTaskStatus(taskId, newStatus) {
      const task = this.#boardtasks.find(task => task.id === taskId);
      if (task) {
        task.status = newStatus;
        try{
          const updatedTask = await this.#tasksApiService.updateTask(task);
          Object.assign(task,updatedTask);
          this._notify(UserAction.UPDATE_TASK,task);
        }catch (err){
          console.error('Ошибка при обновлении статуса задачи на сервер:',err);
          task.status=previousStatus;
          throw err;
        }
      }
    }
 
 deleteTask(taskId){
  this.#boardtasks = this.#boardtasks.filter(task => task.id !==taskId)
  this._notify(UserAction.DELETE_TASK,{id:taskId});
 }

 async clearGarbageTasks(){
  const garbageTasks = this.#boardtasks.filter(task => task.status ==='garbage');
  try{
    await Promise.all(garbageTasks.map(task=>this.#tasksApiService.deleteTask(task.id)));
    this.#boardtasks =this.#boardtasks.filter(task => task.status !== 'garbage');
    this._notify(UserAction.DELETE_TASK,{status:'garbage'})
  }catch(err){
    console.error('Ошибка при удалении задач из корзины на сервере',err);
    throw err;
  }
 }

 hasGarbageTasks(){
  return this.#boardtasks.some(task => task.status ==='garbage')
 }
 
} 