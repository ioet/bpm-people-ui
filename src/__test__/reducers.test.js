import expect from 'expect';
import * as types from '../action-types';
import {
  message, inputError, userEdit, userDelete, user, userList, hover,
} from '../reducers';
import { Variable } from '../constants';
import { getUserToBeCreated } from '../component/utils/Utils';

describe('message reducer', () => {
  it('should return the initial state', () => {
    expect(message(undefined, {
      type: types.InitialAction.INITIAL_STATE,
    }))
      .toEqual({
        open: false,
      });
  });

  it('should handle SHOW_INFO_MESSAGE', () => {
    const someTestMessage = 'someTestMessage';
    const showMessageAction = {
      type: types.MessageAction.SHOW_MESSAGE,
      message: someTestMessage,
    };
    expect(message({}, showMessageAction))
      .toEqual({
        message: someTestMessage,
        open: true,
      });
  });

  it('should handle HIDE_INFO_MESSAGE', () => {
    const hideMessageAction = {
      type: types.MessageAction.HIDE_MESSAGE,
    };
    expect(message({}, hideMessageAction))
      .toEqual({
        message: '',
        open: false,
      });
  });
});

describe('inputError reducer', () => {
  it('should return the initial state', () => {
    expect(inputError(undefined, {
      type: types.InitialAction.INITIAL_STATE,
    }))
      .toEqual({});
  });

  it('should handle ERROR_ADD', () => {
    const someField = 'emailField';
    const addErrorAction = {
      type: types.InputErrorAction.ADD,
      field: someField,
    };
    expect(inputError({}, addErrorAction))
      .toEqual({
        [someField]: true,
      });
  });

  it('should handle ERROR_REMOVE_ALL', () => {
    const removeAllErrorsAction = {
      type: types.InputErrorAction.REMOVE_ALL,
    };
    expect(inputError({}, removeAllErrorsAction))
      .toEqual({});
  });
});

describe('userEdit reducer', () => {
  it('should return the initial state', () => {
    expect(userEdit(undefined, {
      type: types.InitialAction.INITIAL_STATE,
    }))
      .toEqual({
        editing: false,
      });
  });

  it('should handle USER_EDIT_START', () => {
    const someEditUserId = 'someUserId';
    const editUserStartAction = {
      type: types.UserAction.EDIT_START,
      id: someEditUserId,
    };
    expect(userEdit({}, editUserStartAction))
      .toEqual({
        editing: true,
        id: someEditUserId,
      });
  });

  it('should handle USER_EDIT_DATA for name', () => {
    const field = Variable.NAME;
    const someEditUserName = 'someName';

    const changeEditUserDataAction = {
      type: types.UserAction.EDIT_DATA,
      field,
      value: someEditUserName,
    };
    expect(userEdit({
      editing: true,
    }, changeEditUserDataAction))
      .toEqual({
        editing: true,
        [field]: someEditUserName,
      });
  });

  it('should handle USER_EDIT_DATA for email', () => {
    const field = Variable.AUTHENTICATION_IDENTITY;
    const someEditUserEmail = 'someEmail';

    const changeEditUserDataAction = {
      type: types.UserAction.EDIT_DATA,
      field,
      value: someEditUserEmail,
    };
    expect(userEdit({
      editing: true,
    }, changeEditUserDataAction))
      .toEqual({
        editing: true,
        [field]: someEditUserEmail,
      });
  });

  it('should handle USER_EDIT_END', () => {
    const endEditUserAction = {
      type: types.UserAction.EDIT_END,
    };
    expect(userEdit({}, endEditUserAction))
      .toEqual({
        editing: false,
        name: null,
        authentication_identity: null,
      });
  });
});

describe('userDelete reducer', () => {
  it('should return the initial state', () => {
    expect(userDelete(undefined, {
      type: types.InitialAction.INITIAL_STATE,
    }))
      .toEqual({
        open: false,
      });
  });

  it('should handle SHOW_DIALOG', () => {
    const userIdsToDelete = ['someUserId', 'oneMoreUserId'];
    const showDeleteDialogAction = {
      type: types.DeleteAction.SHOW_DIALOG,
      userIds: userIdsToDelete,
    };
    expect(userDelete({}, showDeleteDialogAction))
      .toEqual({
        open: true,
        userIds: userIdsToDelete,
      });
  });

  it('should handle HIDE_DIALOG', () => {
    const hideDeleteDialogAction = {
      type: types.DeleteAction.HIDE_DIALOG,
    };
    expect(userDelete({}, hideDeleteDialogAction))
      .toEqual({
        open: false,
      });
  });
});

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(user(undefined, {
      type: types.InitialAction.INITIAL_STATE,
    }))
      .toEqual({});
  });
});

describe('userList reducer', () => {
  it('should return the initial state', () => {
    expect(userList(undefined, {
      type: types.InitialAction.INITIAL_STATE,
    }))
      .toEqual({});
  });

  it('should handle ADD_EMPTY_ROW', () => {
    const someUser = getUserToBeCreated();
    const addEmptyRowAction = {
      type: types.UserAction.ADD_EMPTY_ROW,
    };
    expect(userList({}, addEmptyRowAction))
      .toEqual({
        [someUser.id]: someUser,
      });
  });

  it('should handle REMOVE_EMPTY_ROW', () => {
    const someUser = getUserToBeCreated();
    const removeEmptyRowAction = {
      type: types.UserAction.REMOVE_EMPTY_ROW,
    };
    expect(userList({
      [someUser.id]: someUser,
    }, removeEmptyRowAction))
      .toEqual({});
  });

  it('should handle USER_ADD_USER', () => {
    const someUser = {
      id: 'someId',
      name: 'someName',
      authentication_identity: 'some@email.com',
    };
    const addOneUserAction = {
      type: types.UserAction.ADD_USER,
      user: someUser,
    };
    expect(userList({}, addOneUserAction))
      .toEqual({
        [someUser.id]: someUser,
      });
  });

  it('should handle USER_ADD_USERS', () => {
    const someUser = {
      id: 'someId',
      name: 'someName',
      authentication_identity: 'some@email.com',
    };
    const someOtherUser = {
      id: 'someOtherId',
      name: 'someOtherName',
      authentication_identity: 'someOther@email.com',
    };
    const addMultipleUsersAction = {
      type: types.UserAction.ADD_USERS,
      user: [someUser, someOtherUser],
    };
    expect(userList({}, addMultipleUsersAction))
      .toEqual({
        [someUser.id]: someUser,
        [someOtherUser.id]: someOtherUser,
      });
  });

  it('should handle USER_UPDATE', () => {
    const someUser = {
      id: 'someId',
      name: 'someName',
      authentication_identity: 'some@email.com',
    };
    const someUserUpdated = {
      id: 'someId',
      name: 'someUpdatedName',
      authentication_identity: 'someUpdated@email.com',
    };
    const updateUserAction = {
      type: types.UserAction.UPDATE,
      user: someUserUpdated,
    };
    expect(userList({
      [someUser.id]: someUser,
    }, updateUserAction))
      .toEqual({
        [someUser.id]: someUserUpdated,
      });
  });

  it('should handle USER_REMOVE', () => {
    const someUserToBeRemoved = {
      id: 'someId',
      name: 'someName',
      authentication_identity: 'some@email.com',
    };
    const removeUserAction = {
      type: types.UserAction.REMOVE,
      userId: someUserToBeRemoved.id,
    };
    expect(userList({
      [someUserToBeRemoved.id]: someUserToBeRemoved,
    }, removeUserAction))
      .toEqual({});
  });
});

describe('hover reducer', () => {
  it('should return the initial state', () => {
    expect(hover(undefined, {
      type: types.InitialAction.INITIAL_STATE,
    }))
      .toEqual({
        hover: false,
      });
  });

  it('should handle HOVER_OVER', () => {
    const hoverId = 'someId';
    const hoverOverAction = {
      type: types.HoverAction.OVER,
      id: hoverId,
    };
    expect(hover({}, hoverOverAction))
      .toEqual({
        hover: true,
        id: hoverId,
      });
  });

  it('should handle HOVER_OUT', () => {
    const hoverOutAction = {
      type: types.HoverAction.OUT,
    };
    expect(hover({}, hoverOutAction))
      .toEqual({
        hover: false,
      });
  });
});
