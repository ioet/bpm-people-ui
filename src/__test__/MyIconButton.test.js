import React from 'react';
import MyIconButton from '../component/presentational/MyIconButton';

describe('<MyIconButton />', () => {
  test('Component Renders correctly', () => {
    const appWrapper = shallow(<MyIconButton />);

    expect(toJson(appWrapper))
      .toMatchSnapshot();
  });
});
