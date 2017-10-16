import React, {Component} from 'react';

import './input.scss';

import { Input } from 'antd';
const Search = Input.Search;


export default class SearchInput extends Component {
    
    constructor(props){
        super(props);
    }

    onSearch (value) {
        let allDatas = this.props.datas['responseDatas'],searchDatas = [];
        for(let i=0;i<allDatas.length;i++){
            let cur = allDatas[i];
            console.log(value)
            if(value && value.indexOf(cur['classId']) != -1){
                searchDatas.push(cur);
            }else if(value == ''){
                searchDatas.push(cur);
            }
        };
        this.props.changeState({
            responseDatas: searchDatas,
            showSearchDatas: true
        });
    };

    render () {
        return (
            <Search
                placeholder={this.props.datas.resetSeachInput?"search classid":value}
                onSearch={value => this.onSearch(value)}
                onPressEnter={value => this.onSearch(value)}
                className="searchInput"/>
        )
    }
}