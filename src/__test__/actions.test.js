import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import moxios from 'moxios';
import * as types from '../action-types';
import * as actions from '../actions';
import {
  ErrorMessage, NotificationMessage, PromptMessage, Variable,
} from '../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  it('should create an action to add many users', () => {
    const users = [
      {
        id: 'someId',
        name: 'User Name',
        authentication_identity: 'test@mail.com',
      },
      {
        id: 'someOtherId',
        name: 'Other User Name',
        authentication_identity: 'otherTest@mail.com',
      },
    ];
    const expectedAction = {
      type: types.UserAction.ADD_USERS,
      user: users,
    };
    expect(actions.addUsers(users))
      .toEqual(expectedAction);
  });

  it('should create an action to add a single user', () => {
    const user = {
      id: 'someId',
      name: 'User Name',
      authentication_identity: 'test@email.com',
    };
    const expectedAction = {
      type: types.UserAction.ADD_USER,
      user,
    };
    expect(actions.addUser(user))
      .toEqual(expectedAction);
  });

  it('should create an action to set an error to an input field', () => {
    const someField = 'inputField';
    const expectedAction = {
      type: types.InputErrorAction.ADD,
      field: someField,
    };
    expect(actions.setInputError(someField))
      .toEqual(expectedAction);
  });

  it('should create an action to remove errors from all input fields', () => {
    const expectedAction = {
      type: types.InputErrorAction.REMOVE_ALL,
    };
    expect(actions.removeAllInputErrors())
      .toEqual(expectedAction);
  });

  it('should create an action to show a message', () => {
    const someMessage = 'some message';
    const expectedAction = {
      type: types.MessageAction.SHOW_MESSAGE,
      message: someMessage,
    };
    expect(actions.showMessage(someMessage))
      .toEqual(expectedAction);
  });

  it('should create an action to hide all messages', () => {
    const expectedAction = {
      type: types.MessageAction.HIDE_MESSAGE,
    };
    expect(actions.hideMessage())
      .toEqual(expectedAction);
  });

  it('should create an action to show the delete confirmation dialog', () => {
    const userIds = [
      'userId1',
      'userId2',
    ];
    const expectedAction = {
      type: types.DeleteAction.SHOW_DIALOG,
      open: true,
      userIds,
    };
    expect(actions.showDeleteDialog(userIds))
      .toEqual(expectedAction);
  });

  it('should create an action to hide the delete confirmation dialog', () => {
    const expectedAction = {
      type: types.DeleteAction.HIDE_DIALOG,
      open: false,
    };
    expect(actions.hideDeleteDialog())
      .toEqual(expectedAction);
  });

  it('should create an action to start editing a user', () => {
    const id = 'someId';
    const name = 'User Name';
    const authentication_identity = 'test@email.com';
    const userToEdit = {
      id,
      name,
      authentication_identity,
    };
    const expectedActions = [
      {
        type: types.UserAction.EDIT_START,
        id,
        name,
        authentication_identity,
      },
    ];

    const store = mockStore({
      userList: {
        [userToEdit.id]: userToEdit,
      },
    });
    store.dispatch(actions.prepareEditUser(userToEdit.id));
    expect(store.getActions())
      .toEqual(expectedActions);
  });

  it('should create an action to end editing a user', () => {
    const expectedAction = {
      type: types.UserAction.EDIT_END,
    };
    expect(actions.endEditUser())
      .toEqual(expectedAction);
  });

  it('should create an action to set the edited data of a user', () => {
    const field = 'someField';
    const value = 'someValue';
    const expectedAction = {
      type: types.UserAction.EDIT_DATA,
      field,
      value,
    };
    expect(actions.setUserEditData(field, value))
      .toEqual(expectedAction);
  });

  it('should create an action to set the user to update', () => {
    const userToUpdate = {
      id: 'someId',
      name: 'User Name',
      authentication_identity: 'test@email.com',
    };
    const expectedAction = {
      type: types.UserAction.UPDATE,
      user: userToUpdate,
    };
    expect(actions.setUpdateUser(userToUpdate))
      .toEqual(expectedAction);
  });

  it('should create an action to set the user to remove', () => {
    const userIdToRemove = 'someUserIdToRemove';
    const expectedAction = {
      type: types.UserAction.REMOVE,
      userId: userIdToRemove,
    };
    expect(actions.removeUser(userIdToRemove))
      .toEqual(expectedAction);
  });

  it('should create an action to indicate hover', () => {
    const id = 'someId';
    const expectedAction = {
      type: types.HoverAction.OVER,
      id,
    };
    expect(actions.hoverOver(id))
      .toEqual(expectedAction);
  });

  it('should create an action to indicate not hovering anymore', () => {
    const expectedAction = {
      type: types.HoverAction.OUT,
    };
    expect(actions.hoverOut())
      .toEqual(expectedAction);
  });
});

describe('async actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('creates ADD_USERS when getting all users was successful', () => {
    const getPeopleMock = [
      {
        id: 'someId',
        name: 'User Name',
        authentication_identity: 'test@mail.com',
      },
      {
        id: 'someOtherId',
        name: 'Other User Name',
        authentication_identity: 'otherTest@mail.com',
      },
    ];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: getPeopleMock,
      });
    });

    const expectedActions = [
      {
        type: types.UserAction.ADD_USERS,
        user: getPeopleMock,
      },
    ];

    const store = mockStore({ user: [] });

    return store.dispatch(actions.getAllUsersAsync())
      .then(() => {
        expect(store.getActions())
          .toEqual(expectedActions);
      });
  });

  it('creates ADD_USERS when getting all users was NOT successful', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
      });
    });

    const expectedActions = [
      {
        type: types.MessageAction.SHOW_MESSAGE,
        message: ErrorMessage.FAILED_TO_LOAD_USERS,
      },
    ];

    const store = mockStore({ user: [] });

    return store.dispatch(actions.getAllUsersAsync())
      .then(() => {
        expect(store.getActions())
          .toEqual(expectedActions);
      });
  });

  it('creates an action to show an error message when creating a user was NOT successful', () => {
    const createUserMock = {
      id: 'someId',
      name: 'User Name',
      authentication_identity: 'test@mail.com',
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
      });
    });

    const expectedActions = [
      {
        type: types.UserAction.RESET_PASSWORD_FIELDS,
      },
      {
        type: types.MessageAction.SHOW_MESSAGE,
        message: ErrorMessage.FAILED_TO_CREATE_USER,
      },
    ];

    const store = mockStore({ userEdit: createUserMock });

    return store.dispatch(actions.createUserAsync())
      .then(() => {
        expect(store.getActions())
          .toEqual(expectedActions);
      });
  });

  it('creates some actions when creating a user was successful', () => {
    const createUserMock = {
      name: 'someName',
      authentication_identity: 'someValid@email.com',
      password: 'Asdf123#',
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: createUserMock,
      });
    });

    const expectedActions = [
      {
        type: types.InputErrorAction.REMOVE_ALL,
      },
      {
        type: types.InputErrorAction.REMOVE_ALL,
      },
      {
        type: types.InputErrorAction.REMOVE_ALL,
      },
      {
        type: types.UserAction.RESET_PASSWORD_FIELDS,
      },
      {
        type: types.UserAction.EDIT_END,
      },
      {
        type: types.UserAction.ADD_USER,
        user: createUserMock,
      },
      {
        type: types.MessageAction.SHOW_MESSAGE,
        message: createUserMock.name + NotificationMessage.USER_CREATED_SUCCESSFULLY,
      },
    ];

    const store = mockStore({
      userEdit: {
        ...createUserMock,
        password_confirm: 'Asdf123#',
      },
    });

    return store.dispatch(actions.handleCloseCreateUserDialog(true))
      .then(() => {
        expect(store.getActions())
          .toEqual(expectedActions);
      });
  });

  it('creates some actions when removing a user was successful', () => {
    const removeUserMock = {
      id: 'someId',
      name: 'User Name',
      authentication_identity: 'test@mail.com',
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 204,
      });
    });

    const expectedActions = [
      {
        type: types.MessageAction.SHOW_MESSAGE,
        message: removeUserMock.name + NotificationMessage.USER_DELETED_SUCCESSFULLY,
      },
      {
        type: types.UserAction.REMOVE,
        userId: removeUserMock.id,
      },
    ];

    const store = mockStore({ userList: { [removeUserMock.id]: removeUserMock } });

    return store.dispatch(actions.removeUserAsync(removeUserMock.id))
      .then(() => {
        expect(store.getActions())
          .toEqual(expectedActions);
      });
  });

  it('creates INFO_MESSAGE when removing a user was NOT successful', () => {
    const removeUserMock = {
      id: 'someId',
      name: 'User Name',
      authentication_identity: 'test@mail.com',
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
      });
    });

    const expectedActions = [
      {
        type: types.MessageAction.SHOW_MESSAGE,
        message: ErrorMessage.FAILED_TO_REMOVE_USER,
      },
    ];

    const store = mockStore({ user: [] });

    return store.dispatch(actions.removeUserAsync(removeUserMock))
      .then(() => {
        expect(store.getActions())
          .toEqual(expectedActions);
      });
  });

  it('creates some actions when updating a user was successful', () => {
    const updatedUserMock = {
      id: 'someId',
      name: 'New User Name',
      authentication_identity: 'newTest@mail.com',
    };
    const userToUpdate = {
      id: 'someId',
      name: 'Old User Name',
      authentication_identity: 'oldTest@mail.com',
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: updatedUserMock,
      });
    });

    const expectedActions = [
      {
        type: types.InputErrorAction.REMOVE_ALL,
      },
      {
        type: types.InputErrorAction.REMOVE_ALL,
      },
      {
        type: types.UserAction.EDIT_END,
      },
      {
        type: types.UserAction.UPDATE,
        user: updatedUserMock,
      },
      {
        type: types.MessageAction.SHOW_MESSAGE,
        message: NotificationMessage.CHANGES_UPDATED_SUCCESSFULLY,
      },
    ];

    const store = mockStore({
      userList: {
        [userToUpdate.id]: userToUpdate,
      },
      userEdit: userToUpdate,
    });

    return store.dispatch(actions.handleCloseEditUserDialog(true))
      .then(() => {
        expect(store.getActions())
          .toEqual(expectedActions);
      });
  });

  it('creates some actions when updating a user with invalid data', () => {
    const userToUpdate = {
      id: 'someId',
      name: 'Old User Name',
      authentication_identity: 'invalid@@@@mail.com',
    };

    const expectedActions = [
      {
        type: types.InputErrorAction.REMOVE_ALL,
      },
      {
        type: types.MessageAction.SHOW_MESSAGE,
        message: PromptMessage.ENTER_VALID_EMAIL,
      },
      {
        type: types.InputErrorAction.ADD,
        field: Variable.AUTHENTICATION_IDENTITY,
      },
    ];

    const store = mockStore({
      userList: {
        [userToUpdate.id]: userToUpdate,
      },
      userEdit: userToUpdate,
    });

    store.dispatch(actions.handleCloseEditUserDialog(true));
    expect(store.getActions())
      .toEqual(expectedActions);
  });

  it('creates some actions when updating a users name was successful', () => {
    const updatedUserMock = {
      id: 'someId',
      name: 'New User Name',
      authentication_identity: 'newTest@mail.com',
    };
    const userToUpdate = {
      id: 'someId',
      name: 'Old User Name',
      authentication_identity: 'oldTest@mail.com',
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: updatedUserMock,
      });
    });

    const expectedActions = [
      {
        type: types.InputErrorAction.REMOVE_ALL,
      },
      {
        type: types.UserAction.EDIT_END,
      },
      {
        type: types.UserAction.UPDATE,
        user: updatedUserMock,
      },
      {
        type: types.MessageAction.SHOW_MESSAGE,
        message: NotificationMessage.CHANGES_UPDATED_SUCCESSFULLY,
      },
    ];

    const store = mockStore({
      userList: {
        [userToUpdate.id]: userToUpdate,
      },
      userEdit: {
        id: updatedUserMock.id,
        name: updatedUserMock.name,
      },
    });

    return store.dispatch(actions.updateUserAsync(userToUpdate.id))
      .then(() => {
        expect(store.getActions())
          .toEqual(expectedActions);
      });
  });

  it('creates some actions when updating a users email with an invalid email', () => {
    const updatedUserMock = {
      id: 'someId',
      name: 'New User Name',
      authentication_identity: 'newTest@mail@.com',
    };
    const userToUpdate = {
      id: 'someId',
      name: 'Old User Name',
      authentication_identity: 'oldTest@mail.com',
    };

    const expectedActions = [
      {
        type: types.InputErrorAction.REMOVE_ALL,
      },
      {
        type: types.MessageAction.SHOW_MESSAGE,
        message: PromptMessage.ENTER_VALID_EMAIL,
      },
      {
        type: types.InputErrorAction.ADD,
        field: Variable.AUTHENTICATION_IDENTITY,
      },
    ];

    const store = mockStore({
      userList: {
        [userToUpdate.id]: userToUpdate,
      },
      userEdit: {
        id: updatedUserMock.id,
        authentication_identity: updatedUserMock.authentication_identity,
      },
    });

    store.dispatch(actions.updateUserAsync(userToUpdate.id));
    expect(store.getActions())
      .toEqual(expectedActions);
  });

  it('creates INFO_MESSAGE when updating a user was NOT successful', () => {
    const userToUpdate = {
      id: 'someId',
      name: 'Old User Name',
      authentication_identity: 'oldTest@mail.com',
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
      });
    });

    const expectedActions = [
      {
        type: types.InputErrorAction.REMOVE_ALL,
      },
      {
        type: types.MessageAction.SHOW_MESSAGE,
        message: ErrorMessage.FAILED_TO_UPDATE_USER,
      },
    ];

    const store = mockStore({
      userList: {
        [userToUpdate.id]: userToUpdate,
      },
      userEdit: userToUpdate,
    });

    return store.dispatch(actions.updateUserAsync(userToUpdate.id))
      .then(() => {
        expect(store.getActions())
          .toEqual(expectedActions);
      });
  });

  it('creates ERROR_REMOVE_ALL and EDIT_END when nothing was changed while editing a user', () => {
    const userToUpdate = {
      id: 'someId',
      name: 'Old User Name',
      authentication_identity: 'oldTest@mail.com',
    };

    const expectedActions = [
      {
        type: types.InputErrorAction.REMOVE_ALL,
      },
      {
        type: types.UserAction.EDIT_END,
      },
    ];

    const store = mockStore({
      userList: {
        [userToUpdate.id]: userToUpdate,
      },
      userEdit: {},
    });

    store.dispatch(actions.updateUserAsync(userToUpdate.id));
    expect(store.getActions())
      .toEqual(expectedActions);
  });

  it('creates EDIT_START when starting to create a user', () => {
    const expectedActions = [
      {
        type: types.UserAction.EDIT_START,
      },
    ];

    const store = mockStore({
      userEdit: {
        editing: false,
      },
    });

    store.dispatch(actions.startCreateUser());
    expect(store.getActions())
      .toEqual(expectedActions);
  });

  it('creates some actions when stopping to create a user', () => {
    const expectedActions = [
      {
        type: types.UserAction.EDIT_END,
      },
      {
        type: types.InputErrorAction.REMOVE_ALL,
      },
      {
        type: types.MessageAction.SHOW_MESSAGE,
        message: NotificationMessage.CHANGES_DISCARDED,
      },
    ];

    const store = mockStore({
      userEdit: {
        editing: true,
      },
    });

    store.dispatch(actions.handleCloseCreateUserDialog(false));
    expect(store.getActions())
      .toEqual(expectedActions);
  });

  it('creates some actions when stopping to edit a user', () => {
    const expectedActions = [
      {
        type: types.UserAction.EDIT_END,
      },
      {
        type: types.InputErrorAction.REMOVE_ALL,
      },
      {
        type: types.MessageAction.SHOW_MESSAGE,
        message: NotificationMessage.CHANGES_DISCARDED,
      },
    ];

    const store = mockStore({
      userEdit: {
        editing: true,
      },
    });

    store.dispatch(actions.handleCloseEditUserDialog(false));
    expect(store.getActions())
      .toEqual(expectedActions);
  });

  it('creates some actions when a user is updated', () => {
    const updatedUserMock = {
      id: 'someId',
      name: 'New User Name',
      authentication_identity: 'newTest@mail.com',
    };
    const userToUpdate = {
      id: 'someId',
      name: 'Old User Name',
      authentication_identity: 'oldTest@mail.com',
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: updatedUserMock,
      });
    });

    const expectedActions = [
      {
        type: types.InputErrorAction.REMOVE_ALL,
      },
      {
        type: types.UserAction.EDIT_END,
      },
      {
        type: types.UserAction.UPDATE,
        user: updatedUserMock,
      },
      {
        type: types.MessageAction.SHOW_MESSAGE,
        message: NotificationMessage.CHANGES_UPDATED_SUCCESSFULLY,
      },
    ];

    const store = mockStore({
      userList: {
        [userToUpdate.id]: userToUpdate,
      },
      userEdit: userToUpdate,
    });


    return store.dispatch(actions.updateUserAsync(userToUpdate.id))
      .then(() => {
        expect(store.getActions())
          .toEqual(expectedActions);
      });
  });
});
