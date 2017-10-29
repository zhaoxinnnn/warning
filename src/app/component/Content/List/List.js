import React, {Component} from 'react';
import Table from 'antd/lib/table';  // 加载 JS

import './list.scss';

export default class List extends Component {
    state = {
        datas: [],
        pagination: {}
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
                dataIndex: 't',
                key: 't'
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
                className: 'truncation',
                key: 'appPath',
                style:'width:10%',
                render: text => <a href={text} target="_blank">{text}</a>
            },{
                title: '其他信息',
                dataIndex: 'otherInfo',
                key: 'otherInfo'
            }];
        if(this.props.datas.tableLoading){
            return (
                <div className="warning-list">
                    <div className="ant-table-wrapper">
                        <div className="ant-spin-nested-loading">
                            <div>
                                <div className="ant-spin ant-spin-spinning ant-table-without-pagination ant-table-spin-holder"><span className="ant-spin-dot"><i></i><i></i><i></i><i></i></span></div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else if(this.props.showSearchDatas){
            return (
                <div className="warning-list">
                    <Table bordered
                    dataSource={this.renderTable(this.props.datas.searchDatas)} 
                    columns={columns} 
                    pagination={this.state.pagination}
                    rowKey='key1'
                    loading={this.props.datas.tableLoading}
                    />
                </div>
            );
        }else{
            return (
                <div className="warning-list">
                    <Table bordered
                    dataSource={this.renderTable(this.props.datas.responseDatas)} 
                    columns={columns} 
                    pagination={this.state.pagination}
                    rowKey='key2'
                    loading={this.props.datas.tableLoading}
                    />
                </div>
            );
        };
        
    }
}