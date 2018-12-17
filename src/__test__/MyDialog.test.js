import React from 'react';
import BpmDialog from '../component/presentational/BpmDialog';

describe('<BpmDialog />', () => {
  test('Component Renders correctly', () => {
    const appWrapper = shallow(<BpmDialog />);

    expect(toJson(appWrapper))
      .toMatchSnapshot();
  });
});
