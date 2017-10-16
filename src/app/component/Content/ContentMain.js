import React, {Component} from 'react';
import axios from 'axios';

import Tab from './Tab/Tab';
import List from './List/List';
import Input from './Input/Input';
import Reset from './Reset/Reset';

import './ContentMain.scss';

export default class ContentMain extends Component {

    constructor(props){
        super(props);
    };

    render () {
        return (
            <div className="warning-content">
                <Tab 
                    datas={this.props.datas} 
                    changeState={this.props.changeState}
                    />
                <right className="rightPart">
                    <Input 
                        datas={this.props.datas} 
                        changeState={this.props.changeState}/>
                    <Reset 
                        datas={this.props.datas} 
                        changeState={this.props.changeState}/>
                    <List datas={this.props.datas}/>
                </right>
            </div>
        );
    }
}