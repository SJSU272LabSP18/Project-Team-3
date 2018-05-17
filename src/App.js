
import React, { Component } from 'react';
import Router from './components/Router';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions/index.js';

import {ajax} from './commons/helpers';

import Header from './layout/header';
import Footer from './layout/footer';

import { ToastContainer, toast } from 'react-toastify';

class AppStub extends Component {

  componentWillMount() {

    // global object for anayltics
    window.Fandango_Analytics = {
      clicks : 0,
      area_monitor : []
    }

    window.logFandango_Analytics = true;

    let obj = this;
    ajax({},function(response){

        let u = {};

        if(typeof response.user !== "undefined")
          u = response.user;


          obj.props.manageSession(response.logged,u);
          obj.props.updateBooking(response.booking);



    },'/session');

  }

  render() {
    return (
      <div className="App">
       <Header />
        <Router />
       <Footer />
       <ToastContainer />
      </div>
    );
  }
}

function mapStateToProps(state) {

    return { user : state.user , guest : state.guest , userLoggedIn : state.userLoggedIn };
 }

function mapDispatchToProps(dispatch) {

    return bindActionCreators(actions,dispatch);
 }

const App = connect(mapStateToProps,mapDispatchToProps)(AppStub);

export default App;
