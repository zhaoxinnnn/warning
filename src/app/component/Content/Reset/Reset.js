import React, {Component} from 'react';  
import { Button } from 'antd';

import './reset.scss';

export default class resetButton extends Component {
    
    constructor(props){
        super(props);
    }

    resetDatas () {
        this.props.changeState({
            responseDatas: this.props.datas.backupsDatas,
            showSearchDatas: false,
            resetSeachInput: true
        });
    };

    render () {
        return (
            <Button onClick={this.resetDatas.bind(this)} className="reset">重置</Button>
        )
    }
}