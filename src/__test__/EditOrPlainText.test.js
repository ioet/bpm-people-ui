import React from 'react';
import EditOrPlainText from '../component/presentational/EditOrPlainText';

describe('<EditOrPlainText />', () => {
  test('Component Renders correctly', () => {
    const appWrapper = shallow(<EditOrPlainText />);

    expect(toJson(appWrapper))
      .toMatchSnapshot();
  });
});
