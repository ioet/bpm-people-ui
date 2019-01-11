/* eslint-disable camelcase,prefer-destructuring */
import axios from 'axios';
import { validateEmail, validatePassword } from './component/utils/Utils';
import {
  DeleteAction, HoverAction, InputErrorAction, MessageAction, UserAction,
} from './action-types';
import {
  ErrorMessage, NotificationMessage, PromptMessage, Variable,
} from './constants';
import {
  getUserEdit,
  getUserEditAuthenticationIdentity,
  getUserEditId,
  getUserEditName,
  getUserEditPassword,
  getUserForId,
  getUserNameForId,
} from './selectors';

const PEOPLE_API_PATH = '/people';
axios.defaults.baseURL = process.env.BPM_PEOPLE_API_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const addUsers = allUsers => ({
  type: UserAction.ADD_USERS,
  user: allUsers,
});
export const addUser = oneUser => ({
  type: UserAction.ADD_USER,
  user: oneUser,
});

export const setInputError = field => ({
  type: InputErrorAction.ADD,
  field,
});
export const removeAllInputErrors = () => ({
  type: InputErrorAction.REMOVE_ALL,
});

export const showMessage = errorMessage => ({
  type: MessageAction.SHOW_MESSAGE,
  message: errorMessage,
});
export const hideMessage = () => ({
  type: MessageAction.HIDE_MESSAGE,
});

export const showDeleteDialog = userIds => ({
  type: DeleteAction.SHOW_DIALOG,
  open: true,
  userIds,
});
export const hideDeleteDialog = () => ({
  type: DeleteAction.HIDE_DIALOG,
  open: false,
});

export const startCreateUser = () => ({
  type: UserAction.EDIT_START,
});

export const startEditUser = editUser => ({
  type: UserAction.EDIT_START,
  id: editUser.id,
  name: editUser.name,
  authentication_identity: editUser.authentication_identity,
});
export const prepareEditUser = editUserId => (dispatch, getState) => {
  dispatch(startEditUser(getUserForId(getState(), editUserId)));
};

export const setUserEditData = (field, value) => ({
  type: UserAction.EDIT_DATA,
  field,
  value,
});
export const endEditUser = () => ({
  type: UserAction.EDIT_END,
});

export const resetPasswordFields = () => ({
  type: UserAction.RESET_PASSWORD_FIELDS,
});

export const setUpdateUser = userToUpdate => ({
  type: UserAction.UPDATE,
  user: userToUpdate,
});

export const removeUser = userId => ({
  type: UserAction.REMOVE,
  userId,
});

export const getAllUsersAsync = () => (
  dispatch => axios.get(PEOPLE_API_PATH)
    .then((response) => {
      dispatch(addUsers(response.data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(showMessage(ErrorMessage.FAILED_TO_LOAD_USERS));
    })
);

export const validateField = input => !(typeof input === 'undefined' || input === '');

export const validateInputWithErrorMessages = (dispatch, user) => {
  dispatch(removeAllInputErrors());
  if (!validateField(user.name)) {
    dispatch(showMessage(PromptMessage.ENTER_VALID_NAME));
    dispatch(setInputError(Variable.NAME));
    return false;
  }

  if (!validateEmail(user.authentication_identity)) {
    dispatch(showMessage(PromptMessage.ENTER_VALID_EMAIL));
    dispatch(setInputError(Variable.AUTHENTICATION_IDENTITY));
    return false;
  }
  return true;
};

export const createUserAsync = () => (
  (dispatch, getState) => {
    const state = getState();
    const name = getUserEditName(state);
    const authentication_identity = getUserEditAuthenticationIdentity(state);
    const password = getUserEditPassword(state);

    dispatch(resetPasswordFields());
    return axios.post(PEOPLE_API_PATH, {
      name,
      authentication_identity,
      password,
    })
      .then((response) => {
        dispatch(endEditUser());
        dispatch(addUser(response.data));
        dispatch(showMessage(response.data.name + NotificationMessage.USER_CREATED_SUCCESSFULLY));
      })
      .catch((error) => {
        // console.log(error); find a way to log this error
        dispatch(showMessage(ErrorMessage.FAILED_TO_CREATE_USER));
      });
  }
);

export const updateUserAsync = () => (
  (dispatch, getState) => {
    const state = getState();
    const userId = getUserEditId(state);
    const user = getUserForId(state, userId);
    let name = getUserEditName(state);
    let authentication_identity = getUserEditAuthenticationIdentity(state);

    if (typeof name === 'undefined' && typeof authentication_identity === 'undefined') {
      dispatch(removeAllInputErrors());
      return dispatch(endEditUser());
    }

    if (typeof name === 'undefined') {
      name = user.name;
    }
    if (typeof authentication_identity === 'undefined') {
      authentication_identity = user.authentication_identity;
    }

    if (!validateInputWithErrorMessages(dispatch, {
      name,
      authentication_identity,
    })) {
      return null;
    }

    return axios.put(`${PEOPLE_API_PATH}/${userId}`, {
      authentication_identity,
      name,
    })
      .then((response) => {
        dispatch(endEditUser());
        dispatch(setUpdateUser(response.data));
        dispatch(showMessage(NotificationMessage.CHANGES_UPDATED_SUCCESSFULLY));
      })
      .catch((error) => {
        // console.log(error); find a way to log this error
        dispatch(showMessage(ErrorMessage.FAILED_TO_UPDATE_USER));
      });
  }
);

export const clearUser = () => (
  (dispatch) => {
    dispatch(endEditUser());
    dispatch(removeAllInputErrors());
    dispatch(showMessage(NotificationMessage.CHANGES_DISCARDED));
  }
);

export const validatePasswordInputWithErrorMessages = (dispatch, userEdit) => {
  dispatch(removeAllInputErrors());
  const { password, password_confirm } = userEdit;
  if (typeof password === 'undefined' || password === '') {
    dispatch(setInputError(Variable.PASSWORD));
    dispatch(showMessage(ErrorMessage.NO_PASSWORD_ENTERED));
    return false;
  }
  if (password !== password_confirm) {
    dispatch(setInputError(Variable.PASSWORD_CONFIRM));
    dispatch(showMessage(ErrorMessage.PASSWORDS_DO_NOT_MATCH));
    return false;
  }
  if (!validatePassword(password)) {
    dispatch(setInputError(Variable.PASSWORD));
    dispatch(showMessage(ErrorMessage.PASSWORD_NOT_STRONG_ENOUGH));
    return false;
  }
  dispatch(removeAllInputErrors());
  return true;
};

export const checkPasswordInputAndCreateUser = () => (
  (dispatch, getState) => {
    if (!validatePasswordInputWithErrorMessages(dispatch, getUserEdit(getState()))) return null;
    return dispatch(createUserAsync());
  }
);

export const checkInput = next => (
  (dispatch, getState) => {
    if (!validateInputWithErrorMessages(dispatch, getUserEdit(getState()))) {
      return null;
    }
    return dispatch(next());
  }
);

export const handleCloseCreateUserDialog = confirmed => (
  dispatch => ((confirmed) ? dispatch(checkInput(checkPasswordInputAndCreateUser)) : dispatch(clearUser()))
);

export const handleCloseEditUserDialog = confirmed => (
  dispatch => ((confirmed) ? dispatch(checkInput(updateUserAsync)) : dispatch(clearUser()))
);

export const removeUserAsync = userId => (
  (dispatch, getState) => axios.delete(`${PEOPLE_API_PATH}/${userId}`)
    .then(() => {
      dispatch(showMessage(getUserNameForId(getState(), userId) + NotificationMessage.USER_DELETED_SUCCESSFULLY));
      dispatch(removeUser(userId));
    })
    .catch((error) => {
      // console.log(error); find a way to log this error
      dispatch(showMessage(ErrorMessage.FAILED_TO_REMOVE_USER));
    })
);

export const hoverOver = id => ({
  type: HoverAction.OVER,
  id,
});

export const hoverOut = () => ({
  type: HoverAction.OUT,
});
