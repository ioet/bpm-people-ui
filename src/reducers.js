/* eslint-disable no-plusplus */
import { combineReducers } from 'redux';
import { compareUsersByFirstName, getEmptyUser } from './component/utils/Utils';
import {
  DeleteAction, HoverAction, InputErrorAction, MessageAction, UserAction,
} from './action-types';

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
    case InputErrorAction.REMOVE_ALL:
      return {};
    default:
      return state;
  }
};

const userEdit = (state = { create: false, update: false }, action) => {
  switch (action.type) {
    case UserAction.CREATION_START:
      return ({
        id: getEmptyUser().id,
        create: true,
        update: false,
      });
    case UserAction.EDIT_START:
      return ({
        id: action.id,
        create: false,
        update: true,
      });
    case UserAction.EDIT_DATA:
      return ({
        ...state,
        [action.field]: action.name,
      });
    case UserAction.EDIT_END:
      return ({
        create: false,
        update: false,
        name: null,
        authentication_identity: null,
      });
    case UserAction.CREATION_END:
      return ({
        create: false,
        update: false,
        name: null,
        authentication_identity: null,
      });
    default:
      return state;
  }
};

const userDelete = (state = { open: false, user: {} }, action) => {
  switch (action.type) {
    case DeleteAction.SHOW_DIALOG:
      return {
        open: action.open,
        user: action.user,
      };
    case DeleteAction.HIDE_DIALOG:
      return {
        open: false,
        user: {},
      };
    default:
      return state;
  }
};

const user = (state, action) => {
  switch (action.type) {
    case UserAction.CREATION_START:
      return getEmptyUser();
    case UserAction.ADD_USER:
      return {
        id: action.id,
        name: action.name,
        authentication_identity: action.authentication_identity,
      };
    case UserAction.ADD_USERS:
      return action.user.map(u => u);
    default:
      return state;
  }
};
const userList = (state = [], action) => {
  const copy = state.slice();
  switch (action.type) {
    case UserAction.CREATION_START:
      return [
        user(undefined, action),
        ...state,
      ];
    case UserAction.CREATION_END:
      copy.shift();
      return [...copy];
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
    case UserAction.UPDATE:
      for (let i = 0; i < copy.length; i++) {
        if (copy[i].id === action.user.id) {
          copy[i] = action.user;
          break;
        }
      }
      return [...copy].sort(compareUsersByFirstName);
    case UserAction.REMOVE:
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

const hover = (state = { hover: false }, action) => {
  switch (action.type) {
    case HoverAction.OVER:
      return {
        hover: true,
        id: action.id,
      };
    case HoverAction.OUT:
      return {
        hover: false,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  userList,
  message,
  inputError,
  userEdit,
  userDelete,
  hover,
});

export default rootReducer;
