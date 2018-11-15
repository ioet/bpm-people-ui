import React from 'react';
import UserList from '../component/presentational/UserList';

describe('<UserList />', () => {
  test('Component Renders correctly', () => {
    const appWrapper = shallow(<UserList />);

    expect(toJson(appWrapper))
      .toMatchSnapshot();
  });
});
