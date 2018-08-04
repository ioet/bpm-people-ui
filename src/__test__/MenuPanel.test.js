import React from 'react';
import MenuPanel from '../component/MenuPanel';

describe('<MenuPanel/>', () => {
  test('Component Shallow Test', () => {
    global.shallow(<MenuPanel />);
  });
});
