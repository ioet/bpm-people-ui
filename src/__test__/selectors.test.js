import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import { getUserNameForDelete } from '../selectors';
import { DeleteDialogConst } from '../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('userDelete selector', () => {
  it('should return undefined if no userId is to be deleted', () => {
    const store = mockStore({
      userDelete: {},
    });

    expect(getUserNameForDelete(store.getState()))
      .toEqual(undefined);
  });

  it('should return the username if there is one user to be deleted', () => {
    const mockUserToDelete = {
      id: 'someId',
      name: 'Some Name',
      authentication_identity: 'some@email.com',
    };
    const store = mockStore({
      userDelete: {
        userIds: [mockUserToDelete.id],
      },
      userList: {
        [mockUserToDelete.id]: mockUserToDelete,
      },
    });

    expect(getUserNameForDelete(store.getState()))
      .toEqual(mockUserToDelete.name);
  });

  it('should return the amount of users to be deleted', () => {
    const mockUserToDelete = {
      id: 'someId',
      name: 'Some Name',
      authentication_identity: 'some@email.com',
    };
    const otherMockUserToDelete = {
      id: 'someOtherId',
      name: 'Some Other Name',
      authentication_identity: 'someOther@email.com',
    };

    const store = mockStore({
      userDelete: {
        userIds: [
          mockUserToDelete.id,
          otherMockUserToDelete.id,
        ],
      },
      userList: {
        [mockUserToDelete.id]: mockUserToDelete,
        [otherMockUserToDelete.id]: otherMockUserToDelete,
      },
    });

    expect(getUserNameForDelete(store.getState()))
      .toEqual(`2${DeleteDialogConst.CONTENT_TEXT_MULTI_USER}`);
  });
});
