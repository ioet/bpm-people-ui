import React from 'react';
import DeleteDialog from '../component/presentational/DeleteDialog';

describe('<DeleteDialog />', () => {
  test('Component Renders correctly', () => {
    const appWrapper = shallow(<DeleteDialog />);

    expect(toJson(appWrapper))
      .toMatchSnapshot();
  });
});
