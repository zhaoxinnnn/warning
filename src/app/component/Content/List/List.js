import React, {Component} from 'react';

import './List.scss';

export default class List extends Component {
    render () {
        console.log(this.props.datas);
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
                        <tr>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                            <td>5</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}