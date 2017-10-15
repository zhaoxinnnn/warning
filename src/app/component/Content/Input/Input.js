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
            if(value.indexOf(cur['classId']) != -1){
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
            placeholder="search classid"
            onSearch={value => this.onSearch(value)}
            className="searchInput"
          />
        )
    }
}