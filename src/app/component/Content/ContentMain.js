import React, {Component} from 'react';

import Tab from './Tab/tab';
import List from './List/list';

export default class ContentMain extends Component {
    render () {
        return (
            <div className="warning-content">
                <Tab/>
                <List/>
            </div>
        );
    }
}