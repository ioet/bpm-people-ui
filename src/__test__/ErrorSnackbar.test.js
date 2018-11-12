import React from 'react';
import ErrorSnackbar from '../component/presentational/ErrorSnackbar';

describe('<ErrorSnackbar />', () => {
  test('Component Renders correctly', () => {
    const appWrapper = shallow(<ErrorSnackbar />);

    expect(toJson(appWrapper))
      .toMatchSnapshot();
  });
});
