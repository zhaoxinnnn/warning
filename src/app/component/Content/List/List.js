import React, {Component} from 'react';

import './List.scss';

export default class List extends Component {
    constructor (props) {
        super(props);
    };
    renderTable (datas) {
        console.log(datas)
        if(datas && datas.length != 0){
            return datas.map(function(curData){
                let eles = [],countTd = 0;
                for(let key in curData){
                    if(/path/gim.test(key)){
                        eles.push(<td key={key}><a href={curData[key]} target="_blank">{curData[key]}</a></td>);
                    }else{
                        eles.push(<td key={key}>{curData[key]}</td>);
                    }
                    countTd++;
                }
                countTd<6?eles.push(<td>暂无</td>):null;
                return <tr>{eles}</tr>;
            });
        }
    };
    render () {
        return (
            <div className="warning-list">
                <table className="warning-table">
                    <colgroup>
                        <col style={{width:'20%'}}/>
                        <col style={{width:'10%'}}/>
                        <col style={{width:'10%'}}/>
                        <col style={{width:'10%'}}/>
                        <col style={{width:'30%'}}/>
                        <col style={{width:'10%'}}/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>时间</th>
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