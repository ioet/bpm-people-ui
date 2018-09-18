/* eslint-disable no-plusplus,no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import App from './App';

console.log('Hello World!');

const error = (state = [], action) => {
  switch (action.type) {
    case 'ERROR_MESSAGE':
      return ({
        open: action.open,
        message: action.message,
      });
    default:
      return state;
  }
};

const userCreationData = (state = [], action) => {
  switch (action.type) {
    case 'USER_CREATION_DATA':
      return ({
        display_name: action.display_name,
        authentication_identity: action.authentication_identity,
      });
    default:
      return state;
  }
};

const userEditData = (state = [], action) => {
  switch (action.type) {
    case 'EDIT_USER_GUID':
      return ({
        guid: action.user.guid,
      });
    case 'EDIT_USER_DATA':
      return ({
        guid: state.guid,
        display_name: action.display_name,
        authentication_identity: action.authentication_identity,
      });
    case 'EDIT_USER_END':
      return ({
        guid: '',
        display_name: '',
        authentication_identity: '',
      });
    default:
      return state;
  }
};

const user = (state, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        guid: action.guid,
        display_name: action.display_name,
        authentication_identity: action.authentication_identity,
      };
    case 'ADD_USERS':
      return action.user.map(u => u);
    case 'UPDATE_USER':
      // check if state.guid is accessible here
      if (state.guid !== action.user.guid) {
        return state;
      }
      return [
        ...state,
        {
          display_name: action.display_name,
          authentication_identity: action.authentication_identity,
        },
      ];
    default:
      return state;
  }
};
const userList = (state = [], action) => {
  const copy = state.slice();
  switch (action.type) {
    case 'ADD_USER':
      return [
        ...state,
        user(undefined, action),
      ];
    case 'ADD_USERS':
      return [
        ...state,
        ...user(undefined, action),
      ];
    case 'UPDATE_USER':
      for (let i = 0; i < copy.length; i++) {
        if (copy[i].guid === action.user.guid) {
          copy[i] = action.user;
          break;
        }
      }
      return [...copy];
    case 'REMOVE_USER':
      for (let i = 0; i < copy.length; i++) {
        if (copy[i].guid === action.user.guid) {
          copy.splice(i, 1);
          break;
        }
      }
      return [...copy];
    default:
      return state;
  }
};

const peopleApp = combineReducers({
  userCreationData,
  userList,
  error,
  userEditData,
});

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={createStore(peopleApp)}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
});
