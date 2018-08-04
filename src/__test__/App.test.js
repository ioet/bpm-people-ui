import React from 'react';
import App from '../App';

describe('<App/>', () => {
  test('Component Shallow Test', () => {
    global.shallow(<App />);
  });
});
