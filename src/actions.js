/* eslint-disable camelcase,prefer-destructuring */
import { PersonControllerApi, Person } from 'swagger_bpm_people_api';
import { getUserToBeCreated, validateEmail } from './component/utils/Utils';
import {
  DeleteAction, HoverAction, InputErrorAction, MessageAction, UserAction,
} from './action-types';
import {
  ErrorMessage, NotificationMessage, PromptMessage, Variable,
} from './constants';

const peopleApi = new PersonControllerApi();

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

export const addEmptyRow = () => ({
  type: UserAction.ADD_EMPTY_ROW,
});

export const removeEmptyRow = () => ({
  type: UserAction.REMOVE_EMPTY_ROW,
});

export const startEditUser = editUserId => ({
  type: UserAction.EDIT_START,
  id: editUserId,
});
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

export const startCreateUser = () => (
  (dispatch) => {
    dispatch(addEmptyRow());
    dispatch(startEditUser(getUserToBeCreated().id));
  }
);

export const endCreateUser = () => (
  (dispatch) => {
    dispatch(removeEmptyRow());
    dispatch(endEditUser());
  }
);

export const setUpdateUser = userToUpdate => ({
  type: UserAction.UPDATE,
  user: userToUpdate,
});

export const removeUser = userId => ({
  type: UserAction.REMOVE,
  userId,
});

export const getAllUsersAsync = () => (
  dispatch => peopleApi.getAllPersonsUsingGET()
    .then((data) => {
      dispatch(addUsers(data));
    })
    .catch((error) => {
      // console.log(error); find a way to log this error
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
    const { name, authentication_identity, password } = getState().userEdit;

    const personToCreate = new Person();
    personToCreate.name = name;
    personToCreate.authentication_identity = authentication_identity;
    personToCreate.password = password;
    dispatch(resetPasswordFields());
    return peopleApi.createPersonUsingPOST(personToCreate)
      .then((data) => {
        dispatch(endCreateUser());
        dispatch(addUser(data));
        dispatch(showMessage(data.name + NotificationMessage.USER_CREATED_SUCCESSFULLY));
      })
      .catch((error) => {
        // console.log(error); find a way to log this error
        dispatch(showMessage(ErrorMessage.FAILED_TO_CREATE_USER));
      });
  }
);

export const updateUserAsync = userId => (
  (dispatch, getState) => {
    const { id } = getState().userEdit;
    const user = getState().userList[userId];
    let { name, authentication_identity } = getState().userEdit;

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

    const personToUpdate = new Person();
    personToUpdate.name = name;
    personToUpdate.authentication_identity = authentication_identity;
    return peopleApi.updatePersonUsingPUT(id, personToUpdate)
      .then((data) => {
        dispatch(endEditUser());
        dispatch(setUpdateUser(data));
        dispatch(showMessage(NotificationMessage.CHANGES_UPDATED_SUCCESSFULLY));
      })
      .catch((error) => {
        // console.log(error); find a way to log this error
        dispatch(showMessage(ErrorMessage.FAILED_TO_UPDATE_USER));
      });
  }
);

export const clearUser = creating => (
  (dispatch) => {
    if (creating) {
      dispatch(endCreateUser());
    } else {
      dispatch(endEditUser());
    }

    dispatch(removeAllInputErrors());
    dispatch(showMessage(NotificationMessage.CHANGES_DISCARDED));
  }
);

export const openEnterPasswordDialog = () => ({
  type: UserAction.OPEN_PASSWORD_DIALOG,
});

export const closeEnterPasswordDialog = () => ({
  type: UserAction.CLOSE_PASSWORD_DIALOG,
});

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
  dispatch(removeAllInputErrors());
  return true;
};

export const checkPasswordInputAndCreateUser = () => (
  (dispatch, getState) => {
    if (!validatePasswordInputWithErrorMessages(dispatch, getState().userEdit)) return null;
    dispatch(closeEnterPasswordDialog());
    return dispatch(createUserAsync());
  }
);

export const handleOpenEnterPasswordDialog = () => (
  (dispatch, getState) => {
    if (!validateInputWithErrorMessages(dispatch, getState().userEdit)) return null;
    return dispatch(openEnterPasswordDialog());
  }
);

export const resetPasswordAndCloseDialog = () => (
  (dispatch) => {
    dispatch(resetPasswordFields());
    dispatch(closeEnterPasswordDialog());
  }
);

export const handleCloseEnterPasswordDialog = confirmed => (
  dispatch => ((confirmed) ? dispatch(checkPasswordInputAndCreateUser()) : dispatch(resetPasswordAndCloseDialog()))
);

export const editUpdateOrCreateUser = userId => (
  (dispatch, getState) => {
    const userEditId = getState().userEdit.id;

    if (typeof userEditId !== 'undefined') {
      if (userEditId === userId) {
        if (userEditId === getUserToBeCreated().id) {
          return dispatch(handleOpenEnterPasswordDialog());
        }
        return dispatch(updateUserAsync(userId));
      }
      if (userEditId === getUserToBeCreated().id) {
        dispatch(clearUser(true));
      }
    }
    return dispatch(startEditUser(userId));
  }
);

export const removeUserAsync = userId => (
  (dispatch, getState) => peopleApi.deletePersonUsingDELETE(userId)
    .then(() => {
      dispatch(showMessage(getState().userList[userId].name + NotificationMessage.USER_DELETED_SUCCESSFULLY));
      dispatch(removeUser(userId));
    })
    .catch((error) => {
      // console.log(error); find a way to log this error
      dispatch(showMessage(ErrorMessage.FAILED_TO_REMOVE_USER));
    })
);

export const startOrEndCreateUser = () => (
  (dispatch, getState) => {
    if (!getState().userEdit.editing) {
      dispatch(startCreateUser());
    } else {
      dispatch(clearUser(true));
    }
  }
);

export const clearOrShowDelete = userIds => (
  (dispatch, getState) => {
    if (userIds[0] === getState().userEdit.id) {
      dispatch(clearUser(userIds[0] === getUserToBeCreated().id));
    } else {
      dispatch(showDeleteDialog(userIds));
    }
  }
);

export const hoverOver = id => ({
  type: HoverAction.OVER,
  id,
});

export const hoverOut = () => ({
  type: HoverAction.OUT,
});
