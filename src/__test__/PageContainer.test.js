import React from 'react';
import PageContainer from '../component/PageContainer';

describe('<PageContainer/>', () => {
  test('Component Shallow Test', () => {
    global.shallow(<PageContainer />);
  });
});
