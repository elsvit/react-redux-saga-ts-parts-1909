/**
 * @fileOverview Root App component
 */

import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { history, store } from './store';
import Router from './Router';
import { TOAST_DURATION } from './constants/constants';
import './app.scss';

const App = () => (
  <Provider store={store}>
    <div className="app">
      <Router history={history} />
      <ToastContainer autoClose={TOAST_DURATION} position={toast.POSITION.TOP_CENTER} />
    </div>
  </Provider>
);

export default App;
