import React from 'react';
import {render} from 'react-dom';
import MainApp from './component/Main';
import './app.scss';

let indexDOM = document.getElementById("app");
render(<MainApp />,indexDOM);
