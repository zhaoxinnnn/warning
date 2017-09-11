import React, {Component} from 'react';
import { Table } from 'antd';


export default class List extends Component {
    state = {
        datas: [],
        pagination: {},
        loading: false
    }
    constructor (props) {
        super(props);
    };
    renderTable (datas) {
        if(datas && datas.length != 0){
            return datas.map(function(curData){
                if(!curData['otherInfo']){
                    curData['otherInfo'] = '暂无';
                };
                return curData;
            });
        }
    };
    render () {
        const columns = [{
                title: '报警时间',
                dataIndex: 'dateStr',
                key: 'dateStr'
            },{
                title: 'classId',
                dataIndex: 'classId',
                key: 'classId'
            },{
                title: '错误码',
                dataIndex: 'err_status',
                key: 'err_status'
            },{
                title: '优先级',
                dataIndex: 'priority',
                key: 'priority'
            },{
                title: '报错地址',
                dataIndex: 'appPath',
                key: 'appPath',
                render: text => <a href={text} target="_blank">{text}</a>
            },{
                title: '其他信息',
                dataIndex: 'otherInfo',
                key: 'otherInfo'
            }];
        return (
            <div className="warning-list">
                <Table bordered
                dataSource={this.renderTable(this.props.datas)} 
                columns={columns} 
                rowKey={record => record.registered}
                pagination={this.state.pagination} />
            </div>
        );
    }
}