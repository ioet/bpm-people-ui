import { combineReducers } from 'redux';
import { compareUsersByFirstName } from './component/utils/Utils';
import {
  ADD_USER, ADD_USERS,
  USER_CREATION_DATA,
  EDIT_USER_ID, EDIT_USER_DATA, EDIT_USER_FINISH,
  REMOVE_USER,
  UPDATE_USER,
  ERROR_MESSAGE, USER_CREATION_DATA_RESET,
} from './actions';

const error = (state = [], action) => {
  switch (action.type) {
    case ERROR_MESSAGE:
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
    case USER_CREATION_DATA:
      return ({
        ...state,
        [action.field]: action.name,
      });
    case USER_CREATION_DATA_RESET:
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
    case EDIT_USER_ID:
      return ({
        id: action.id,
      });
    case EDIT_USER_DATA:
      return ({
        ...state,
        [action.field]: action.name,
      });
    case EDIT_USER_FINISH:
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
    case ADD_USER:
      return {
        id: action.id,
        name: action.name,
        authentication_identity: action.authentication_identity,
      };
    case ADD_USERS:
      return action.user.map(u => u);
    case UPDATE_USER:
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
    case ADD_USER:
      return [
        ...state,
        user(undefined, action),
      ].sort(compareUsersByFirstName);
    case ADD_USERS:
      return [
        ...state,
        ...user(undefined, action),
      ].sort(compareUsersByFirstName);
    case UPDATE_USER:
      for (let i = 0; i < copy.length; i++) {
        if (copy[i].id === action.user.id) {
          copy[i] = action.user;
          break;
        }
      }
      return [...copy];
    case REMOVE_USER:
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
  error,
  userEditData,
});

export default rootReducer;
