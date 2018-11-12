import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../actions';
import { compareUsersByFirstName, getUserObjectFromArray } from '../component/utils/Utils';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('utils test', () => {
  it('should check that the input is valid', () => {
    const input = 'someInput';
    expect(actions.validateField(input))
      .toEqual(true);
  });

  it('should verify that an empty input is not valid', () => {
    const input = '';
    expect(actions.validateField(input))
      .toEqual(false);
  });

  it('should verify that undefined input is not valid', () => {
    const input = undefined;
    expect(actions.validateField(input))
      .toEqual(false);
  });

  it('should return true when valid data is supplied', () => {
    const mockUser = {
      id: 'someId',
      name: 'Old User Name',
      authentication_identity: 'oldTest@mail.com',
    };

    const store = mockStore({});
    expect(actions.validateInputWithErrorMessages(store.dispatch, mockUser))
      .toEqual(true);
  });

  it('should return false when invalid name is supplied', () => {
    const mockUser = {
      id: 'someId',
      name: '',
      authentication_identity: 'oldTest@mail.com',
    };

    const store = mockStore({});
    expect(actions.validateInputWithErrorMessages(store.dispatch, mockUser))
      .toEqual(false);
  });

  it('should return false when invalid email is supplied', () => {
    const mockUser = {
      id: 'someId',
      name: 'Test Name',
      authentication_identity: 'oldTest@_@_@mail.com',
    };

    const store = mockStore({});
    expect(actions.validateInputWithErrorMessages(store.dispatch, mockUser))
      .toEqual(false);
  });

  it('should return a sorted list of users when given a unsorted list', () => {
    const firstUser = ['someId1', 'AAA Name', 'some@email.com'];
    const secondUser = ['someId2', 'ZZZ Name', 'some@email.com'];
    const thirdUser = ['someId3', 'ZZZ Name', 'some@email.com'];
    const forthUser = ['someId3', 'MMM Name', 'some@email.com'];

    const userArray = [firstUser, secondUser, thirdUser, forthUser].sort(compareUsersByFirstName);

    expect(userArray)
      .toEqual([firstUser, forthUser, secondUser, thirdUser]);
  });

  it('should return a user object from an array', () => {
    const firstUser = ['someId1', 'AAA Name', 'some@email.com'];

    expect(getUserObjectFromArray(firstUser))
      .toEqual({
        id: firstUser[0],
        name: firstUser[1],
        authentication_identity: firstUser[2],
      });
  });
});
