import React,{Component} from 'react';

import './main.scss';

import Header from './Header/header';
import ContentMain from './Content/ContentMain';
import Footer from './Footer/footer';

export default class MainApp extends Component {
    render () {
        return (
            <div className="SOGOU-WARNING">
                <Header/>
                <ContentMain/>
                <Footer/>
            </div>
        )
    }
}