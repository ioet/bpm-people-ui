import React from 'react';
import App from '../App';
import PageContainer from '../component/PageContainer';

describe('<App/>', () => {
  test('Component Renders correctly', () => {
    const appWrapper = shallow(<App />);

    expect(toJson(appWrapper)).toMatchSnapshot();

    expect(appWrapper.find(PageContainer).exists()).toBe(true);
  });
});
