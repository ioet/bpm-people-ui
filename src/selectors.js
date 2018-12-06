import { DeleteDialogConst, Variable } from './constants';

export const isDeleteDialogOpen = state => state.userDelete.open;

export const getUserIds = state => state.userDelete.userIds;

export const getUserNameForDelete = (state) => {
  const { userIds } = state.userDelete;
  if (!userIds) return undefined;
  return (userIds.length > 1)
    ? userIds.length + DeleteDialogConst.CONTENT_TEXT_MULTI_USER
    : state.userList[userIds].name;
};

export const getUserNameForId = (state, userId) => (state.userList[userId].name);

export const getUserForId = (state, userId) => (state.userList[userId]);

export const getUserEdit = state => state.userEdit;

export const getUserEditId = state => state.userEdit.id;

export const getUserEditName = state => state.userEdit.name;

export const getUserEditAuthenticationIdentity = state => state.userEdit.authentication_identity;

export const getUserEditPassword = state => state.userEdit.password;

export const getUserPasswordConfirm = state => state.userEdit[Variable.PASSWORD_CONFIRM];

export const getInputError = (state, key) => state.inputError[key];

export const isMessageOpen = state => state.message.open;

export const getMessage = state => state.message.message;

export const isEditIdDefined = state => typeof state.userEdit.id !== 'undefined';

export const isUserCreateActive = state => state.userEdit.editing && !isEditIdDefined(state);

export const isUserEditActive = state => state.userEdit.editing && isEditIdDefined(state);

export const isHoverActive = state => state.hover.hover;

export const getHoverId = state => state.hover.id;

export const getUserList = state => state.userList;
