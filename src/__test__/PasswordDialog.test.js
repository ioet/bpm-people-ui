import React from 'react';
import PasswordDialog from '../component/presentational/PasswordDialog';

describe('<PasswordDialog />', () => {
  test('Component Renders correctly', () => {
    const appWrapper = shallow(<PasswordDialog />);

    expect(toJson(appWrapper))
      .toMatchSnapshot();
  });
});
