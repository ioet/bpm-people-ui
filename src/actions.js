/* eslint-disable camelcase */
import axios from 'axios';
import { PEOPLE_API, validateEmail } from './component/utils/Utils';

const ENTER_VALID_NAME = 'Please enter a valid name.';
const ENTER_VALID_EMAIL = 'Please enter a valid email.';

const CHANGES_DISCARDED = 'Your changes have been discarded.';

const CHANGES_UPDATED_SUCCESSFULLY = 'Your changes have been submitted successfully.';
const USER_DELETED_SUCCESSFULLY = ' has been deleted successfully.';

const FAILED_TO_LOAD_USERS = 'Failed to load all saved persons.';
const FAILED_TO_CREATE_USER = 'Failed to create a new person.';
const FAILED_TO_UPDATE_USER = 'Failed to update the person.';
const FAILED_TO_REMOVE_USER = 'Failed to delete the person.';

export const ADD_USERS = 'ADD_USERS';
const addUsers = allUsers => ({
  type: ADD_USERS,
  user: allUsers,
});

export const ADD_USER = 'ADD_USER';
export const addUser = oneUser => ({
  type: ADD_USER,
  id: oneUser.id,
  name: oneUser.name,
  authentication_identity: oneUser.authentication_identity,
});

export const USER_CREATION_DATA_RESET = 'USER_CREATION_DATA_RESET';
export const resetUserCreationData = () => ({
  type: USER_CREATION_DATA_RESET,
});
export const USER_CREATION_DATA = 'USER_CREATION_DATA';
export const setUserCreationData = (field, name) => ({
  type: USER_CREATION_DATA,
  field,
  name,
});

export const ERROR_MESSAGE = 'ERROR_MESSAGE';
export const showMessage = errorMessage => ({
  type: ERROR_MESSAGE,
  open: true,
  message: errorMessage,
});
export const hideErrorMessage = () => ({
  type: ERROR_MESSAGE,
  open: false,
  message: '',
});

export const EDIT_USER_ID = 'EDIT_USER_ID';
const setEditUserId = editUserId => ({
  type: EDIT_USER_ID,
  id: editUserId,
});

export const EDIT_USER_DATA = 'EDIT_USER_DATA';
export const setEditUserData = (field, name) => ({
  type: EDIT_USER_DATA,
  field,
  name,
});

export const EDIT_USER_FINISH = 'EDIT_USER_FINISH';
export const setEditUserFinished = () => ({
  type: EDIT_USER_FINISH,
});

export const UPDATE_USER = 'UPDATE_USER';
export const setUpdateUser = userToUpdate => ({
  type: UPDATE_USER,
  user: userToUpdate,
});

export const REMOVE_USER = 'REMOVE_USER';
const removeUser = userToRemove => ({
  type: REMOVE_USER,
  user: userToRemove,
});

export const getAllUsersAsync = () => (
  dispatch => axios.get(PEOPLE_API)
    .then((response) => {
      dispatch(addUsers(response.data));
    })
    .catch((error) => {
      dispatch(showMessage(`${FAILED_TO_LOAD_USERS}: ${error}`));
    })
);

const validateField = input => !(typeof input === 'undefined' || input === '');

const validateUser = (user) => {
  if (!validateField(user.name)) return ENTER_VALID_NAME;

  if (!validateEmail(user.authentication_identity)) {
    return ENTER_VALID_EMAIL;
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
    return axios.post(PEOPLE_API, {
      name,
      authentication_identity,
    })
      .then((response) => {
        dispatch(resetUserCreationData());
        dispatch(addUser(response.data));
      })
      .catch((error) => {
        dispatch(showMessage(`${FAILED_TO_CREATE_USER}: ${error}`));
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
      return dispatch(showMessage(ENTER_VALID_NAME));
    }
    if (!validateEmail(authentication_identity)) {
      return dispatch(showMessage(ENTER_VALID_EMAIL));
    }

    return axios.put(`${PEOPLE_API}/${id}`, {
      name,
      authentication_identity,
    })
      .then((response) => {
        dispatch(setUpdateUser(response.data));
        dispatch(setEditUserFinished());
        dispatch(showMessage(CHANGES_UPDATED_SUCCESSFULLY));
      })
      .catch((error) => {
        dispatch(showMessage(`${FAILED_TO_UPDATE_USER}: ${error}`));
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
      dispatch(showMessage(CHANGES_DISCARDED));
    }
    return dispatch(setEditUserId(userToUpdate.id));
  }
);

export const removeUserAsync = userToRemove => (
  dispatch => axios.delete(`${PEOPLE_API}/${userToRemove.id}`)
    .then(() => {
      dispatch(removeUser(userToRemove));
      dispatch(showMessage(userToRemove.name + USER_DELETED_SUCCESSFULLY));
    })
    .catch((error) => {
      dispatch(showMessage(`${FAILED_TO_REMOVE_USER}: ${error}`));
    })
);
