import React,{Component} from 'react';

import './Main.scss';

import Header from './Header/Header';
import ContentMain from './Content/ContentMain';
import Footer from './Footer/Footer';
import reducer from './Reducer/MainReducer';
import {createStore} from 'redux';
import axios from 'axios';

const store = createStore(reducer);
const stateDatas = store.getState();

export default class MainApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            warningDatas : []
        }
    };
    componentDidMount () {
        axios.get('/background/readFiles')
            .then(function(response){
                this.setState({
                    warningDatas : response.data.resultJSON
                });
            })
            .catch(function(error){
                console.log(error);
            });
    }
    render () {
        const result = this.state.warningDatas;
        console.log(result);
        return (
            <div className="SOGOU-WARNING">
                <Header/>
                <ContentMain datas={stateDatas}/>
                <Footer/>
            </div>
        )
    }
}