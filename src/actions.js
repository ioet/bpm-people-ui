/* eslint-disable camelcase,prefer-destructuring */
import BpmPeopleApi from 'bpm_people_api';
import { getEmptyUser, validateEmail } from './component/utils/Utils';
import {
  DeleteAction, HoverAction, InputErrorAction, MessageAction, UserAction,
} from './action-types';
import {
  ErrorMessage, NotificationMessage, PromptMessage, Variable,
} from './constants';

const peopleApi = new BpmPeopleApi.PersonControllerApi();

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

const setInputError = field => ({
  type: InputErrorAction.ADD,
  field,
});
const removeAllInputErrors = () => ({
  type: InputErrorAction.REMOVE_ALL,
});

export const showMessage = errorMessage => ({
  type: MessageAction.MESSAGE,
  open: true,
  message: errorMessage,
});
export const hideMessage = () => ({
  type: MessageAction.MESSAGE,
  open: false,
  message: '',
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
export const setUserEditData = (field, name) => ({
  type: UserAction.EDIT_DATA,
  field,
  name,
});
export const endEditUser = () => ({
  type: UserAction.EDIT_END,
});

export const startCreateUser = () => (
  (dispatch) => {
    dispatch(addEmptyRow());
    dispatch(startEditUser(getEmptyUser().tbd.id));
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

const removeUser = userId => ({
  type: UserAction.REMOVE,
  userId,
});

export const getAllUsersAsync = () => (
  dispatch => peopleApi.getAllPersonsUsingGET((error, data) => {
    if (error) {
      dispatch(showMessage(`${ErrorMessage.FAILED_TO_LOAD_USERS}: ${error}`));
    } else {
      dispatch(addUsers(data));
    }
  })
);

const validateField = input => !(typeof input === 'undefined' || input === '');

const validateInputWithErrorMessages = (dispatch, user) => {
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

const createUserAsync = () => (
  (dispatch, getState) => {
    const { name, authentication_identity } = getState().userEdit;

    if (!validateInputWithErrorMessages(dispatch, getState().userEdit)) return null;

    return peopleApi.createPersonUsingPOST({
      name,
      authentication_identity,
      password: '',
    }, (error, data) => {
      if (error) {
        dispatch(showMessage(`${ErrorMessage.FAILED_TO_CREATE_USER}: ${error}`));
      } else {
        dispatch(removeAllInputErrors());
        dispatch(endCreateUser());
        dispatch(addUser(data));
        dispatch(showMessage(data.name + NotificationMessage.USER_CREATED_SUCCESSFULLY));
      }
    });
  }
);

const updateUserAsync = userId => (
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

    return peopleApi.updatePersonUsingPUT(id, {
      name,
      authentication_identity,
    }, (error, data) => {
      if (error) {
        dispatch(showMessage(`${ErrorMessage.FAILED_TO_UPDATE_USER}: ${error}`));
      } else {
        dispatch(removeAllInputErrors());
        dispatch(endEditUser());
        dispatch(setUpdateUser(data));
        dispatch(showMessage(NotificationMessage.CHANGES_UPDATED_SUCCESSFULLY));
      }
    });
  }
);

export const editUpdateOrCreateUser = userId => (
  (dispatch, getState) => {
    const userEditId = getState().userEdit.id;

    if (typeof userEditId !== 'undefined') {
      if (userEditId === userId) {
        if (userEditId === getEmptyUser().tbd.id) {
          return dispatch(createUserAsync());
        }
        return dispatch(updateUserAsync(userId));
      }
      if (userEditId === getEmptyUser().tbd.id) {
        dispatch(showMessage(NotificationMessage.CHANGES_DISCARDED));
        dispatch(removeAllInputErrors());
        dispatch(endCreateUser());
      }
    }
    return dispatch(startEditUser(userId));
  }
);

export const removeUserAsync = userId => (
  (dispatch, getState) => peopleApi.deletePersonUsingDELETE(userId, (error) => {
    if (error) {
      dispatch(showMessage(`${ErrorMessage.FAILED_TO_REMOVE_USER}: ${error}`));
    } else {
      dispatch(showMessage(getState().userList[userId].name + NotificationMessage.USER_DELETED_SUCCESSFULLY));
      dispatch(removeUser(userId));
    }
  })
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
      dispatch(clearUser(userIds[0] === getEmptyUser().tbd.id));
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
