import React from 'react';
import NewPersonButton from '../component/presentational/NewPersonButton';

describe('<NewPersonButton />', () => {
  test('Component Renders correctly', () => {
    const appWrapper = shallow(<NewPersonButton />);

    expect(toJson(appWrapper))
      .toMatchSnapshot();
  });
});
