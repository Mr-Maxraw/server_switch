//React, router
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    HashRouter,
    Route,
    Redirect
} from 'react-router-dom';
//Dx
import { LoadPanel } from 'devextreme-react'

//Pages
import Home from './js/Views/Home.js'
import Instructions from './js/Views/Instructions.js'

class Main extends Component {
    constructor(props){
        super(props)

        this.state = {
            isLoading: false,

        }
    }

    componentDidMount() {

    }

    render() {

        const {
            isLoading
        } = this.state

        return (
            <>
                <LoadPanel
                    showIndicator = {true}
                    message={'Loading...'}
                    visible={isLoading}
                />
                <HashRouter hashType='noslash'>
                    <Redirect from='/' to='/Home' exact/>
                    <Route path={'/Home'} component={Home}/>
                    <Route path={'/Instructions'} component={Instructions}/>
                </HashRouter>
            </>
        );
    }
}

Main.propTypes = {
    
}

export default Main;