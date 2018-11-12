import React from 'react';
import MyTableCell from '../component/presentational/MyTableCell';

describe('<MyTableCell />', () => {
  test('Component Renders correctly', () => {
    const appWrapper = shallow(<MyTableCell />);

    expect(toJson(appWrapper))
      .toMatchSnapshot();
  });
});
