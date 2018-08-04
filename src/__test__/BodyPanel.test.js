import React from 'react';
import BodyPanel from '../component/BodyPanel';

describe('<BodyPanel/>', () => {
  test('Component Shallow Test', () => {
    global.shallow(<BodyPanel />);
  });
});
