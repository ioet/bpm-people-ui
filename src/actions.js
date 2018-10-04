/* eslint-disable camelcase,prefer-destructuring */
import axios from 'axios';
import { validateEmail } from './component/utils/Utils';
import { ErrorAction, UserAction } from './action-types';
import {
  ErrorMessage, NotificationMessage, PeopleApi, PromptMessage,
} from './constants';

axios.defaults.baseURL = process.env.REACT_APP_BPM_PEOPLE_API_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

const addUsers = allUsers => ({
  type: UserAction.ADD_USERS,
  user: allUsers,
});

export const addUser = oneUser => ({
  type: UserAction.ADD_USER,
  id: oneUser.id,
  name: oneUser.name,
  authentication_identity: oneUser.authentication_identity,
});

export const resetUserCreationData = () => ({
  type: UserAction.USER_CREATION_DATA_RESET,
});
export const setUserCreationData = (field, name) => ({
  type: UserAction.USER_CREATION_DATA,
  field,
  name,
});

export const showMessage = errorMessage => ({
  type: ErrorAction.ERROR_MESSAGE,
  open: true,
  message: errorMessage,
});
export const hideErrorMessage = () => ({
  type: ErrorAction.ERROR_MESSAGE,
  open: false,
  message: '',
});

const setEditUserId = editUserId => ({
  type: UserAction.EDIT_USER_ID,
  id: editUserId,
});

export const setEditUserData = (field, name) => ({
  type: UserAction.EDIT_USER_DATA,
  field,
  name,
});

export const setEditUserFinished = () => ({
  type: UserAction.EDIT_USER_FINISH,
});

export const setUpdateUser = userToUpdate => ({
  type: UserAction.UPDATE_USER,
  user: userToUpdate,
});

const removeUser = userToRemove => ({
  type: UserAction.REMOVE_USER,
  user: userToRemove,
});

export const getAllUsersAsync = () => (
  dispatch => axios.get(PeopleApi.PATH)
    .then((response) => {
      dispatch(addUsers(response.data));
    })
    .catch((error) => {
      dispatch(showMessage(`${ErrorMessage.FAILED_TO_LOAD_USERS}: ${error}`));
    })
);

const validateField = input => !(typeof input === 'undefined' || input === '');

const validateUser = (user) => {
  if (!validateField(user.name)) return PromptMessage.ENTER_VALID_NAME;

  if (!validateEmail(user.authentication_identity)) {
    return PromptMessage.ENTER_VALID_EMAIL;
  }
  return true;
};

export const createUserAsync = () => (
  (dispatch, getStore) => {
    const validData = validateUser(getStore().userCreationData);
    if (validData !== true) {
      return dispatch(showMessage(validData));
    }
    const { name, authentication_identity } = getStore().userCreationData;
    return axios.post(PeopleApi.PATH, {
      name,
      authentication_identity,
    })
      .then((response) => {
        dispatch(resetUserCreationData());
        dispatch(addUser(response.data));
      })
      .catch((error) => {
        dispatch(showMessage(`${ErrorMessage.FAILED_TO_CREATE_USER}: ${error}`));
      });
  }
);

const updateUserAsync = userToUpdate => (
  (dispatch, getStore) => {
    const { id } = getStore().userEditData;
    let { name, authentication_identity } = getStore().userEditData;

    if (!(typeof name !== 'undefined') && !(typeof authentication_identity !== 'undefined')) {
      return dispatch(setEditUserFinished());
    }

    if (!(typeof name !== 'undefined')) {
      name = userToUpdate.name;
    }
    if (!(typeof authentication_identity !== 'undefined')) {
      authentication_identity = userToUpdate.authentication_identity;
    }

    if (!validateField(name)) {
      return dispatch(showMessage(PromptMessage.ENTER_VALID_NAME));
    }
    if (!validateEmail(authentication_identity)) {
      return dispatch(showMessage(PromptMessage.ENTER_VALID_EMAIL));
    }

    return axios.put(`${PeopleApi.PATH}/${id}`, {
      name,
      authentication_identity,
    })
      .then((response) => {
        dispatch(setUpdateUser(response.data));
        dispatch(setEditUserFinished());
        dispatch(showMessage(NotificationMessage.CHANGES_UPDATED_SUCCESSFULLY));
      })
      .catch((error) => {
        dispatch(showMessage(`${ErrorMessage.FAILED_TO_UPDATE_USER}: ${error}`));
      });
  }
);

export const editOrUpdateUser = userToUpdate => (
  (dispatch, getStore) => {
    const userEditId = getStore().userEditData.id;
    if (typeof userEditId !== 'undefined') {
      if (userEditId === userToUpdate.id) {
        return dispatch(updateUserAsync(userToUpdate));
      }
      dispatch(showMessage(NotificationMessage.CHANGES_DISCARDED));
    }
    return dispatch(setEditUserId(userToUpdate.id));
  }
);

export const removeUserAsync = userToRemove => (
  dispatch => axios.delete(`${PeopleApi.PATH}/${userToRemove.id}`)
    .then(() => {
      dispatch(removeUser(userToRemove));
      dispatch(showMessage(userToRemove.name + NotificationMessage.USER_DELETED_SUCCESSFULLY));
    })
    .catch((error) => {
      dispatch(showMessage(`${ErrorMessage.FAILED_TO_REMOVE_USER}: ${error}`));
    })
);
