export const Status = { 
    BACKLOG: `backlog`, 
    PROCESSING: `in_progress`, 
    DONE: `done`, 
    BASKET: `garbage`, 
  }; 
   
 
 
export const StatusLabel = { 
    [Status.BACKLOG]:` Бэклог`, 
    [Status.PROCESSING]: `В процессе`, 
    [Status.DONE]:` Готово`, 
    [Status.BASKET]:` Корзина`, 
  };