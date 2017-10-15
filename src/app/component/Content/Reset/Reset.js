import React, {Component} from 'react';  
import { Button } from 'antd';

import './reset.scss';

export default class resetButton extends Component {
    
    constructor(props){
        super(props);
    };

    resetDatas () {
        console.log(this);
        this.props.changeState({
            responseDatas: this.props.backupsDatas,
            showSearchDatas: false
        });
    };

    render () {
        return (
            <Button onClick={this.resetDatas} className="reset">重置</Button>
        )
    }
}