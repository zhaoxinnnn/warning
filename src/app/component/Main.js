import React,{Component} from 'react';

import './Main.scss';

import Header from './Header/Header';
import ContentMain from './Content/ContentMain';
import Footer from './Footer/Footer';
import reducer from './Reducer/MainReducer';
import {createStore} from 'redux';
import axios from 'axios';


export default class MainApp extends Component {
    constructor(props){
        super(props);
        function getDatas () {
            axios.get('/background/readFiles')
                .then(function(response){
                    console.log(response);
                })
                .catch(function(error){
                    console.log(error);
                });
        };
        getDatas();
    };
    render () {
        const store = createStore(reducer);
        const stateDatas = store.getState();
        return (
            <div className="SOGOU-WARNING">
                <Header/>
                <ContentMain datas={stateDatas}/>
                <Footer/>
            </div>
        )
    }
}