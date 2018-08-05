import React from 'react';
import BodyPanel from '../component/BodyPanel';

describe('<BodyPanel/>', () => {
  test('Checking default', () => {
    const bodyPanelWrapper = shallow(<BodyPanel />);

    expect(toJson(bodyPanelWrapper)).toMatchSnapshot();
    expect(bodyPanelWrapper.find('div.bodyPanelStyle').length).toEqual(1);
  });
});
