import React, {Component} from 'react';

import Tab from './Tab/Tab';
import List from './List/List';

import './ContentMain.scss';

export default class ContentMain extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (
            <div className="warning-content">
                <Tab/>
                <List datas={this.props.datas}/>
            </div>
        );
    }
}