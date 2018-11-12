export const UserAction = {
  ADD_USERS: 'USER_ADD_USERS',
  ADD_USER: 'USER_ADD_USER',
  ADD_EMPTY_ROW: 'ADD_EMPTY_ROW',
  REMOVE_EMPTY_ROW: 'REMOVE_EMPTY_ROW',
  EDIT_START: 'USER_EDIT_START',
  EDIT_END: 'USER_EDIT_END',
  EDIT_DATA: 'USER_EDIT_DATA',
  UPDATE: 'USER_UPDATE',
  REMOVE: 'USER_REMOVE',
};

export const MessageAction = {
  SHOW_MESSAGE: 'SHOW_INFO_MESSAGE',
  HIDE_MESSAGE: 'HIDE_INFO_MESSAGE',
};

export const InputErrorAction = {
  ADD: 'ERROR_ADD',
  REMOVE_ALL: 'ERROR_REMOVE_ALL',
};

export const DeleteAction = {
  SHOW_DIALOG: 'SHOW_DIALOG',
  HIDE_DIALOG: 'HIDE_DIALOG',
};

export const HoverAction = {
  OVER: 'HOVER_OVER',
  OUT: 'HOVER_OUT',
};

export const InitialAction = {
  INITIAL_STATE: '@@INIT',
};
