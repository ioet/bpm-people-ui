import React from 'react';
import MyDialog from '../component/presentational/MyDialog';

describe('<MyDialog />', () => {
  test('Component Renders correctly', () => {
    const appWrapper = shallow(<MyDialog />);

    expect(toJson(appWrapper))
      .toMatchSnapshot();
  });
});
