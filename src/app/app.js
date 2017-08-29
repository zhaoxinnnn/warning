import React from 'react';
import {render} from 'react-dom';

import MainApp from './component/main';

let indexDOM = document.getElementById("app");
render(<MainApp/>,indexDOM);