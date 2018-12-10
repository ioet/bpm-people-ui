import React from 'react';
import BpmTableCell from '../component/presentational/BpmTableCell';

describe('<BpmTableCell />', () => {
  test('Component Renders correctly', () => {
    const appWrapper = shallow(<BpmTableCell />);

    expect(toJson(appWrapper))
      .toMatchSnapshot();
  });
});
