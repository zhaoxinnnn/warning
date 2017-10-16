import React,{Component} from 'react';

import './Main.scss';

import Header from './Header/Header';
import ContentMain from './Content/ContentMain';
import Footer from './Footer/Footer';
import axios from 'axios';

export default class MainApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            responseDatas: [],//所有数据
            backupsDatas: [],//查询框数据
            showSearchDatas: false,//是否展示查询框相关数据
            tableLoading: true,//是否展示loading
            resetSeachInput: true//是否重置输入框
        }
    };
    //改变state对象
    changeState (stateObj) {
        this.setState(stateObj);
    };
    componentWillMount () {
        axios.get('/getDatas')
        .then(response=>{
            this.setState({
                responseDatas: response.data,
                tableLoading: false,
                backupsDatas: response.data
            });
            console.log(this.state)
        }).catch(function(error){
            this.setState({
                responseDatas: [],
                tableLoading: false,
                backupsDatas: []
            });
        });
    };
    render () {
        return (
            <div className="warning-container">
                <Header/>
                <ContentMain 
                    datas={this.state} 
                    changeState={this.changeState.bind(this)}
                />
            </div>
        )
    }
}
