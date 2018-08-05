import React from 'react';
import App from '../App';

describe('<App/>', () => {
  test('Component Renders correctly', () => {
    const appWrapper = shallow(<App />);

    expect(toJson(appWrapper)).toMatchSnapshot();

    expect(appWrapper.find('PageContainer').length).toEqual(1);
  });
});
