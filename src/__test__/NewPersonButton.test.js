import React from 'react';
import NewPersonButton from '../component/presentational/BpmButton';

describe('<BpmButton />', () => {
  test('Component Renders correctly', () => {
    const appWrapper = shallow(<NewPersonButton />);

    expect(toJson(appWrapper))
      .toMatchSnapshot();
  });
});
