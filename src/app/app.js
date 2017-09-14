import React from 'react';
import {render} from 'react-dom';
import MainApp from './component/Main';
import reducer from './reducer/MainReducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './app.scss';

const store = createStore(reducer);

let indexDOM = document.getElementById("app");
render(<Provider store={store}><MainApp /></Provider>,indexDOM);
