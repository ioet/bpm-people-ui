import { handleErrors, PEOPLE_API, validateEmail } from './component/utils/Utils';

const ENTER_VALID_NAME = 'Please enter a valid name';
const ENTER_VALID_EMAIL = 'Please enter a valid email';

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
export const setErrorMessage = errorMessage => ({
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
export const setEditUserId = editUserId => ({
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
  dispatch => fetch(PEOPLE_API)
    .then(handleErrors)
    .then(res => res.json())
    .then((allUsers) => {
      dispatch(addUsers(allUsers));
    })
    .catch((error) => {
      alert(error);
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
    const userCreationData = getStore().userCreationData;
    const validData = validateUser(userCreationData);
    if (validData !== true) {
      return dispatch(setErrorMessage(validData));
    }
    return fetch(PEOPLE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userCreationData.name,
        authentication_identity: userCreationData.authentication_identity,
      }),
    })
      .then(handleErrors)
      .then(res => res.json())
      .then((result) => {
        // update the list
        const user = {
          id: result.id,
          name: result.name,
          authentication_identity: result.authentication_identity,
        };
        dispatch(resetUserCreationData());
        dispatch(addUser(user));
      })
      .catch((error) => {
        alert(error);
      });
  }
);

export const updateUserAsync = userToUpdate => (
  (dispatch, getStore) => {
    const userEditData = getStore().userEditData;

    // TODO switch this and use PUT instead
    if (!('name' in userEditData)) {
      userEditData.name = userToUpdate.name;
    }
    if (!('authentication_identity' in userEditData)) {
      console.log('test');
      userEditData.authentication_identity = userToUpdate.authentication_identity;
    }
    // if (!('name' in userEditData) && !('authentication_identity' in userEditData)) {
    //   return dispatch(setEditUserFinished());
    // }

    if ('name' in userEditData
      && !validateField(userEditData.name)) {
      return dispatch(setErrorMessage(ENTER_VALID_NAME));
    }
    if ('authentication_identity' in userEditData
      && !validateEmail(userEditData.authentication_identity)) {
      return dispatch(setErrorMessage(ENTER_VALID_EMAIL));
    }

    return fetch(`${PEOPLE_API}/${userEditData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userEditData.name,
        authentication_identity: userEditData.authentication_identity,
      }),
    })
      .then(handleErrors)
      .then(() => {
        dispatch(setUpdateUser(userEditData));
        dispatch(setEditUserFinished());
      })
      .catch((error) => {
        alert(error);
      });
  }
);

export const removeUserAsync = userToRemove => (
  dispatch => fetch(`${PEOPLE_API}/${userToRemove.id}`, {
    method: 'DELETE',
  })
    .then(handleErrors)
    .then(() => dispatch(removeUser(userToRemove)))
    .catch((error) => {
      alert(error);
      console.log(error);
    })
);
