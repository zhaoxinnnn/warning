import React, {Component} from 'react';

import Tab from './Tab/Tab';
import List from './List/List';

export default class ContentMain extends Component {
    render () {
        return (
            <div className="warning-content">
                <Tab/>
                <List datas={this.props.datas}/>
            </div>
        );
    }
}