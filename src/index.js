/* eslint-disable no-plusplus,no-undef,react/jsx-tag-spacing */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import { peopleApp } from './reducers';

console.log('Hello World!');

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={createStore(peopleApp)}>
      <App/>
    </Provider>,
    document.getElementById('root'),
  );
});
