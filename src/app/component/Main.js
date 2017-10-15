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
            responeDatas: []
        }
    };
    onTabChange (newState) {
        this.setState({
            responeDatas: newState
          });
    };
    componentWillMount () {
        //document.getElementsByClassName('ant-table-placeholder').style.display = 'none';
        axios.get('/getDatas')
        .then(response=>{
            this.setState({
                responeDatas: response.data
            });
        }).catch(function(error){
            this.setState({
                responeDatas: []
            });
        });
    };
    render () {
        return (
            <div className="warning-container">
                <Header/>
                <ContentMain datas={this.state.responeDatas} handleDataChange={this.onTabChange.bind(this)}/>
                <Footer/>
            </div>
        )
    }
}
