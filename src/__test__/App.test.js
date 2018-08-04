import React from 'react';
import App from '../App';
import PageContainer from '../component/PageContainer';

describe('<App/>', () => {
  test('Component Renders correctly', () => {
    const appWrapper = global.shallow(<App />);

    expect(global.toJson(appWrapper)).toMatchSnapshot();

    expect(appWrapper.find(PageContainer).exists()).toBe(true);
  });
});
