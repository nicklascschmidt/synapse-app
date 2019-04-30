import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// import App after CSS to load Bootstrap first
import App from './App';

// Redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// Redux - with persistence
// import { loadState, saveState } from './localstorage';
// const persistedState = loadState();

// const initialState = {
//   legalName: null,
//   email: null,
//   phoneNumber: null,
//   userId: null,
//   isLoggedIn: false,
//   activeNodeId: null,
// }

const initialState = {
  legalName: 'test user',
  email: 'test@test.com',
  phoneNumber: '1234567890',
  userId: '5cc3c116a9da8c00667cb074',
  isLoggedIn: true,
  activeNodeId: null,
}

const reducer = (state = initialState, action) => {
  console.log('REDUX STATE',state);
  switch (action.type) {
    case 'USER_LOGIN_REQUEST':
      console.log('global state updated - user logged in',action.payload);
      return {
        legalName: action.payload.legalName,
        email: action.payload.email,
        phoneNumber: action.payload.phoneNumber,
        userId: action.payload.userId,
        isLoggedIn: action.payload.isLoggedIn,
      }
    case 'USER_LOGOUT_REQUEST':
      console.log('global state updated - user logged out');
      return {
        legalName: null,
        email: null,
        phoneNumber: null,
        userId: null,
        isLoggedIn: false,
      }
    case 'UPDATE_activeNodeId':
      console.log('global state updated - activeNodeId updated',action.payload.activeNodeId);
      return {
        activeNodeId: action.payload.activeNodeId,
      }
    default:
      return state;
  }
}

// Switch state vars for persistence
const store = createStore(
  reducer,
  initialState
  // persistedState
);

// store.subscribe(() => {
//   saveState(store.getState());
// })

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
