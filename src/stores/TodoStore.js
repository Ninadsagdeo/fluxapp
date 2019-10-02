import { EventEmitter } from "events"; //nodejs
import dispatcher from "../dispatcher";

class TodoStore extends EventEmitter {
  constructor() {
    super();
    //initial state
    this.todos =[];
    this.data=null;
  }

  handleActions(action) {
    switch(action.type) {
      // case "CREATE_TODO": {
      //   this.createTodo(action.text);
      //   break;
      // }
      case "RECEIVE_TODOS": {
        // console.log(action.todos);
        this.todos = action.payload;
        this.emit("change");
        break;
      }
    }
  }


  // createTodo(text) {
  //   const id = Date.now();

  //   this.todos.push({
  //     id,
  //     text,
  //     complete: false,
  //   });

  //   this.emit("change");
  // }

  getAll() {
    return this.todos;
  }
  deleteAll(){
    this.todos=[];
    console.log(this.todos);
    this.emit('change');
    return true;
  }
}

const todoStore = new TodoStore;
dispatcher.register(todoStore.handleActions.bind(todoStore));
export default todoStore;