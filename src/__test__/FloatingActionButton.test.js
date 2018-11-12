import React from 'react';
import FloatingActionButton from '../component/presentational/FloatingActionButton';

describe('<FloatingActionButton />', () => {
  test('Component Renders correctly', () => {
    const appWrapper = shallow(<FloatingActionButton />);

    expect(toJson(appWrapper))
      .toMatchSnapshot();
  });
});
