import { Middleware } from 'redux';

const asyncFuntionMiddleware: Middleware = storeAPI => next => action => {
    console.log('middleware')
    if(typeof action === 'function') {
        return action(storeAPI.dispatch, storeAPI.getState)
    }
    return next(action)
}

// const fetchSomeData = (dispatch, getState) => {
//     // Make an async HTTP request
//     client.get('todos').then(todos => {
//       // Dispatch an action with the todos we received
//       dispatch({ type: 'todos/todosLoaded', payload: todos })
//       // Check the updated store state after dispatching
//       const allTodos = getState().todos
//       console.log('Number of todos after loading: ', allTodos.length)
//     })
//   }

export { asyncFuntionMiddleware }

