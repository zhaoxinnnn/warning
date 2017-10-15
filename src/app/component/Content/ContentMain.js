import React, {Component} from 'react';
import axios from 'axios';

import Tab from './Tab/Tab';
import List from './List/List';

import './ContentMain.scss';

export default class ContentMain extends Component {

    constructor(props){
        super(props);
    };

    render () {
        return (
            <div className="warning-content">
                <Tab datas={this.props.datas} handleDataChange={this.props.handleDataChange}/>
                <List datas={this.props.datas}/>
            </div>
        );
    }
}