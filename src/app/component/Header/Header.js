import React, {Component} from 'react';

import './Header.scss';

export default class Header extends Component {
    render () {
        return (
          <header className="warning-header">
              <a className="warning-logo" href="#">
                <img src="../src/app/static/images/logo.png"/>
                <span className="warning-site-name">VR实时监控平台</span>
              </a>
              
          </header>
        );
    }
}