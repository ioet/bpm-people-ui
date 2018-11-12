import React from 'react';
import MenuPanel from '../component/MenuPanel';


describe('<MenuPanel/>', () => {
  test('Renders correctly with children', () => {
    const menuPanelWrapper = shallow(<MenuPanel />);

    expect(toJson(menuPanelWrapper)).toMatchSnapshot();

    expect(menuPanelWrapper.find('MenuItem').length).toEqual(3);
    expect(menuPanelWrapper.find('div.menuPanelStyle').length).toEqual(1);
  });
});
