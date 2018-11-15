import React from 'react';
import Footer from '../component/presentational/Footer';

describe('<Footer />', () => {
  test('Component Renders correctly', () => {
    const appWrapper = shallow(<Footer />);

    expect(toJson(appWrapper))
      .toMatchSnapshot();
  });
});
