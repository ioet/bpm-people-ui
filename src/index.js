/* eslint-disable no-plusplus,no-undef,react/jsx-tag-spacing */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import 'typeface-roboto';
import App from './App';
import rootReducer from './reducers';
import { getAllUsersAsync } from './actions';
import { RootTheme } from './styles';

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
  ),
);

store.dispatch(getAllUsersAsync());

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider theme={RootTheme}>
        <App/>
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('root'),
  );
});
