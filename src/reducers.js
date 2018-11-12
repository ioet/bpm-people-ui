/* eslint-disable no-plusplus */
import { combineReducers } from 'redux';
import { arrayToObject, getUserToBeCreated } from './component/utils/Utils';
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

const userEdit = (state = { editing: false }, action) => {
  switch (action.type) {
    case UserAction.EDIT_START:
      return ({
        id: action.id,
        editing: true,
      });
    case UserAction.EDIT_DATA:
      return ({
        ...state,
        [action.field]: action.name,
      });
    case UserAction.EDIT_END:
      return ({
        editing: false,
        name: null,
        authentication_identity: null,
      });
    default:
      return state;
  }
};

const userDelete = (state = { open: false }, action) => {
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

const user = (state, action) => {
  switch (action.type) {
    case UserAction.ADD_EMPTY_ROW:
      return getUserToBeCreated();
    case UserAction.ADD_USER:
      return {
        [action.id]: {
          id: action.id,
          name: action.name,
          authentication_identity: action.authentication_identity,
        },
      };
    case UserAction.ADD_USERS:
      return arrayToObject(action.user, 'id');
    default:
      return state;
  }
};
const userList = (state = {}, action) => {
  const copy = Object.assign({}, state);
  switch (action.type) {
    case UserAction.ADD_EMPTY_ROW:
      return {
        ...user(undefined, action),
        ...state,
      };
    case UserAction.REMOVE_EMPTY_ROW:
      delete copy[getUserToBeCreated().userToBeCreated.id];
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
