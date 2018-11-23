/* eslint-disable no-plusplus */
import { combineReducers } from 'redux';
import { arrayToUserObject, getUserToBeCreated } from './component/utils/Utils';
import {
  DeleteAction, HoverAction, InputErrorAction, MessageAction, UserAction,
} from './action-types';

export const message = (state = { open: false }, action) => {
  switch (action.type) {
    case MessageAction.SHOW_MESSAGE:
      return {
        open: true,
        message: action.message,
      };
    case MessageAction.HIDE_MESSAGE:
      return {
        open: false,
        message: '',
      };
    default:
      return state;
  }
};

export const inputError = (state = {}, action) => {
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

export const userEdit = (state = { editing: false, passwordDialogOpen: false }, action) => {
  switch (action.type) {
    case UserAction.EDIT_START:
      return ({
        ...state,
        id: action.id,
        editing: true,
      });
    case UserAction.EDIT_DATA:
      return ({
        ...state,
        [action.field]: action.value,
      });
    case UserAction.EDIT_END:
      return ({
        ...state,
        id: undefined,
        editing: false,
      });
    case UserAction.OPEN_PASSWORD_DIALOG:
      return {
        ...state,
        passwordDialogOpen: true,
      };
    case UserAction.CLOSE_PASSWORD_DIALOG:
      return {
        ...state,
        passwordDialogOpen: false,
      };
    case UserAction.RESET_PASSWORD_FIELDS:
      return {
        ...state,
        password: undefined,
        password_confirm: undefined,
      };
    default:
      return state;
  }
};

export const userDelete = (state = { open: false }, action) => {
  switch (action.type) {
    case DeleteAction.SHOW_DIALOG:
      return {
        open: true,
        userIds: action.userIds,
      };
    case DeleteAction.HIDE_DIALOG:
      return {
        open: false,
      };
    default:
      return state;
  }
};

export const user = (state = {}, action) => {
  switch (action.type) {
    case UserAction.ADD_EMPTY_ROW:
      return {
        [getUserToBeCreated().id]: getUserToBeCreated(),
      };
    case UserAction.ADD_USER:
      return {
        [action.user.id]: action.user,
      };
    case UserAction.ADD_USERS:
      return arrayToUserObject(action.user, 'id');
    default:
      return state;
  }
};
export const userList = (state = {}, action) => {
  const copy = Object.assign({}, state);
  switch (action.type) {
    case UserAction.ADD_EMPTY_ROW:
      return {
        ...user(undefined, action),
        ...state,
      };
    case UserAction.REMOVE_EMPTY_ROW:
      delete copy[getUserToBeCreated().id];
      return { ...copy };
    case UserAction.ADD_USER:
      return {
        ...state,
        ...user(undefined, action),
      };
    case UserAction.ADD_USERS:
      return {
        ...state,
        ...user(undefined, action),
      };
    case UserAction.UPDATE:
      copy[action.user.id] = action.user;
      return { ...copy };
    case UserAction.REMOVE:
      delete copy[action.userId];
      return { ...copy };
    default:
      return state;
  }
};

export const hover = (state = { hover: false }, action) => {
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
