import dispatcher from "../dispatcher";
import axios from 'axios';

// export function createTodo(text) {
//   dispatcher.dispatch({
//     type: "CREATE_TODO",
//     text,
//   });
// }

// export function deleteTodo(id) {
//   dispatcher.dispatch({
//     type: "DELETE_TODO",
//     id,
//   });
// }

export function reloadTodos() {
  
  dispatcher.dispatch({type: "FETCH_TODOS"});
  // setTimeout(() => {
    
  //   axios("https://jsonplaceholder.typicode.com/posts")
  //   .then((res) => {
  //     dispatcher.dispatch({type: "RECEIVE_TODOS", todos:res.data});
  // })

   
  // }, 1000);
    
  axios("https://jsonplaceholder.typicode.com/posts")
    .then((res) => {
      // console.log(res.data);
      dispatcher.dispatch({type: "RECEIVE_TODOS", payload:res.data});
  })

}