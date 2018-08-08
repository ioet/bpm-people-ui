import React from 'react';
import PageContainer from '../component/PageContainer';

describe('<PageContainer/>', () => {
  test('Renders correctly with children', () => {
    const pageContainerWrapper = shallow(<PageContainer />);

    expect(toJson(pageContainerWrapper)).toMatchSnapshot();

    expect(pageContainerWrapper.find('MenuPanel').length).toEqual(1);
    expect(pageContainerWrapper.find('BodyPanel').length).toEqual(1);
    expect(pageContainerWrapper.find('div.pageContainerStyle').length).toEqual(1);
  });
});
