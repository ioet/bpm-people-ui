

import React from 'react';
import App from '../App.jsx';

describe('<App/>', () => {
  test('Component Shallow Test', () => {
    global.shallow(<App />);
  });
});
