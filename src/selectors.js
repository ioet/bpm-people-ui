import React from 'react';
import {
  Add, Clear, Delete, Done, Edit,
} from '@material-ui/icons';
import { DeleteDialogConst, FloatingActionButtonConst, UserListItemConst } from './constants';

export const isDeleteDialogOpen = state => state.userDelete.open;

export const getUserIds = state => state.userDelete.userIds;

export const getUserName = (state) => {
  const { userIds } = state.userDelete;
  if (!userIds) return undefined;
  return (userIds.length > 1)
    ? userIds.length + DeleteDialogConst.CONTENT_TEXT_MULTI_USER
    : state.userList[userIds].name;
};

export const getEditId = state => state.userEdit.id;

export const getInputError = (state, ownProps) => state.inputError[ownProps.name];

export const isMessageOpen = state => state.message.open;

export const getMessage = state => state.message.message;

export const getFabTooltip = state => ((state.userEdit.editing)
  ? FloatingActionButtonConst.TOOLTIP_DISCARD
  : FloatingActionButtonConst.TOOLTIP_ADD
);

export const getFabIcon = state => ((state.userEdit.editing) ? <Clear /> : <Add />);

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
