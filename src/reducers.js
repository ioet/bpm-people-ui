import { combineReducers } from 'redux';
import { compareUsersByFirstName } from './component/utils/Utils';

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
        name: action.name,
        authentication_identity: action.authentication_identity,
      });
    default:
      return state;
  }
};

const userEditData = (state = [], action) => {
  switch (action.type) {
    case 'EDIT_USER_ID':
      return ({
        id: action.id,
      });
    case 'EDIT_USER_DATA':
      return ({
        id: state.id,
        name: action.name,
        authentication_identity: action.authentication_identity,
      });
    case 'EDIT_USER_FINISH':
      return ({
        id: '',
        name: null,
        authentication_identity: null,
      });
    default:
      return state;
  }
};

const user = (state, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        id: action.id,
        name: action.name,
        authentication_identity: action.authentication_identity,
      };
    case 'ADD_USERS':
      return action.user.map(u => u);
    case 'UPDATE_USER':
      // check if state.id is accessible here
      if (state.id !== action.user.id) {
        return state;
      }
      return [
        ...state,
        {
          name: action.name,
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
      ].sort(compareUsersByFirstName);
    case 'ADD_USERS':
      return [
        ...state,
        ...user(undefined, action),
      ].sort(compareUsersByFirstName);
    case 'UPDATE_USER':
      for (let i = 0; i < copy.length; i++) {
        if (copy[i].id === action.user.id) {
          copy[i] = action.user;
          break;
        }
      }
      return [...copy];
    case 'REMOVE_USER':
      for (let i = 0; i < copy.length; i++) {
        if (copy[i].id === action.user.id) {
          copy.splice(i, 1);
          break;
        }
      }
      return [...copy];
    default:
      return state;
  }
};

export const peopleApp = combineReducers({
  userCreationData,
  userList,
  error,
  userEditData,
});
