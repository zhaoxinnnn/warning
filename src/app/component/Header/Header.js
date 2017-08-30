import React, {Component} from 'react';

import './Header.scss';

export default class Header extends Component {
    render () {
        return (
          <header className="warning-header">
              <a className="warning-logo" href="#">
                <img src="/src/app/static/images/logo.png"/>
              </a>
              <span className="warning-site-name">VR实时报警平台</span>
          </header>
        );
    }
}