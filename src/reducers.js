/* eslint-disable no-plusplus */
import { combineReducers } from 'redux';
import { compareUsersByFirstName } from './component/utils/Utils';
import { UserAction, MessageAction, InputErrorAction } from './action-types';

const message = (state = { open: false }, action) => {
  switch (action.type) {
    case MessageAction.MESSAGE:
      return ({
        open: action.open,
        message: action.message,
      });
    default:
      return state;
  }
};

const inputError = (state = {}, action) => {
  switch (action.type) {
    case InputErrorAction.ADD:
      return ({
        ...state,
        [action.field]: true,
      });
    case InputErrorAction.REMOVE:
      return ({
        ...state,
        [action.field]: false,
      });
    default:
      return state;
  }
};

const userCreationData = (state = [], action) => {
  switch (action.type) {
    case UserAction.USER_CREATION_DATA:
      return ({
        ...state,
        [action.field]: action.name,
      });
    case UserAction.USER_CREATION_DATA_RESET:
      return {
        name: '',
        authentication_identity: '',
      };
    default:
      return state;
  }
};

const userEditData = (state = [], action) => {
  switch (action.type) {
    case UserAction.EDIT_USER_ID:
      return ({
        id: action.id,
      });
    case UserAction.EDIT_USER_DATA:
      return ({
        ...state,
        [action.field]: action.name,
      });
    case UserAction.EDIT_USER_FINISH:
      return ({
        name: null,
        authentication_identity: null,
      });
    default:
      return state;
  }
};

const user = (state, action) => {
  switch (action.type) {
    case UserAction.ADD_USER:
      return {
        id: action.id,
        name: action.name,
        authentication_identity: action.authentication_identity,
      };
    case UserAction.ADD_USERS:
      return action.user.map(u => u);
    case UserAction.UPDATE_USER:
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
    case UserAction.ADD_USER:
      return [
        ...state,
        user(undefined, action),
      ].sort(compareUsersByFirstName);
    case UserAction.ADD_USERS:
      return [
        ...state,
        ...user(undefined, action),
      ].sort(compareUsersByFirstName);
    case UserAction.UPDATE_USER:
      for (let i = 0; i < copy.length; i++) {
        if (copy[i].id === action.user.id) {
          copy[i] = action.user;
          break;
        }
      }
      return [...copy];
    case UserAction.REMOVE_USER:
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

const rootReducer = combineReducers({
  userCreationData,
  userList,
  message,
  inputError,
  userEditData,
});

export default rootReducer;
