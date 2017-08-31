import React, {Component} from 'react';

import './List.scss';

export default class List extends Component {
    constructor (props) {
        super(props);
    };
    renderTable (datas) {
        if(datas && datas.length != 0){
            return datas.forEach(function(curData){
                for(let key in curData){
                    if(/path/gim.test(key)){
                        <tr><td><a href='${curData[key]}' target="_blank">${curData[key]}</a></td></tr>;
                    }else{
                        <tr><td>${curData[key]}</td></tr>;
                    }
                }
            });
        }
    };
    render () {
        return (
            <div className="warning-list">
                <table className="warning-table">
                    <colgroup>
                        <col style={{width:'200px'}}/>
                        <col style={{width:'200px'}}/>
                        <col style={{width:'100px'}}/>
                        <col style={{width:'400px'}}/>
                        <col style={{width:'200px'}}/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>classid</th>
                            <th>错误码</th>
                            <th>优先级</th>
                            <th>报错地址</th>
                            <th>其他信息</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable(this.props.datas)}
                    </tbody>
                </table>
            </div>
        );
    }
}