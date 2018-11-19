import React from 'react';
import {
  Add, Clear, Delete, Done, Edit,
} from '@material-ui/icons';
import {
  DeleteDialogConst, FloatingActionButtonConst, UserListItemConst, Variable,
} from './constants';
import { getUserToBeCreated } from './component/utils/Utils';

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

export const isPasswordDialogOpen = state => state.userEdit.passwordDialogOpen;

export const getInputError = (state, key) => state.inputError[key];

export const isMessageOpen = state => state.message.open;

export const getMessage = state => state.message.message;

export const isUserEditActive = state => state.userEdit.editing;

export const isUserCreationActive = state => (
  Object.prototype.hasOwnProperty.call(state.userList, getUserToBeCreated().id)
);

export const getFabTooltip = state => ((isUserEditActive(state))
  ? FloatingActionButtonConst.TOOLTIP_DISCARD
  : FloatingActionButtonConst.TOOLTIP_ADD
);

export const getFabIcon = state => ((isUserEditActive(state)) ? <Clear /> : <Add />);

export const isHoverActive = state => state.hover.hover;

export const getHoverId = state => state.hover.id;

export const getDeleteButtonIcon = (state, ownProps) => (
  (state.userEdit.id === ownProps.userId) ? <Clear /> : <Delete />
);

export const getDeleteButtonTooltip = (state, ownProps) => (
  (state.userEdit.id === ownProps.userId)
    ? UserListItemConst.TOOLTIP_DISCARD
    : UserListItemConst.TOOLTIP_DELETE
);

export const getEditButtonIcon = (state, ownProps) => (
  (state.userEdit.id === ownProps.userId) ? <Done /> : <Edit />
);

export const getEditButtonTooltip = (state, ownProps) => (
  (state.userEdit.id === ownProps.userId)
    ? UserListItemConst.TOOLTIP_SAVE
    : UserListItemConst.TOOLTIP_EDIT
);

export const getUserList = state => state.userList;
