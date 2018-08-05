import React from 'react';
import MenuItem from '../component/MenuItem';

describe('<MenuItem/>', () => {
  test('Component renders default value for prop', () => {
    const itemWrapper = shallow(<MenuItem />);

    expect(itemWrapper.text()).toEqual('item');
    expect(toJson(itemWrapper)).toMatchSnapshot();
  });

  test('Component receives the prop correctly', () => {
    const itemWrapper = shallow(<MenuItem text="text to show" />);

    expect(itemWrapper.text()).toEqual('text to show');
  });
});
