import React from 'react';
import BpmIconButton from '../component/presentational/BpmIconButton';

describe('<BpmIconButton />', () => {
  test('Component Renders correctly', () => {
    const appWrapper = shallow(<BpmIconButton />);

    expect(toJson(appWrapper))
      .toMatchSnapshot();
  });
});
