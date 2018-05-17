import axios from 'axios';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { ToastContainer, toast } from 'react-toastify';

import * as actions from '../actions/index.js';
var request_logs = {};

/**
 * Custom ajax handler to make things easier.
 */
export function ajax(opts,callback, url = '/ajax', request = 'post') {

	 const config = { headers: { 'Content-Type': 'application/json' } };

  var r = axios[request]; 

  if( request === 'get' ) {
     opts = { params:opts };
  }

	r(url,opts,config )
    .catch(error => {
        
        return;

        if (url !== '/v1/api/analytics' && window.FANDANGO_RT!=="undefined" && ! toast.isActive(window.FANDANGO_RT)) {

               request_logs[url+"-"+request] = {opts,callback,url,request};

               toast.dismiss();
               window.FANDANGO_RT = toast.info("Connection with server lost. Attempting to reconnecting...", {
                  position: toast.POSITION.TOP_CENTER,
                  autoClose : 6000
                }); 
              /**
               * Attempt to reconnect again in every 6 seconds...
               */
            setTimeout(function(){
                Object.keys(request_logs).map(k => {
                  var a = request_logs[k];
                  ajax(a.opts,a.callback,a.url,a.request);
                
                });
            },6000)  
          }

    })
    .then(function (response) {

      if(typeof response === "undefined") {

         return;
      }

      if(typeof request_logs[url+"-"+request] !== "undefined")
        delete request_logs[url+"-"+request];

    	callback(response.data,response.status);       

    });
};


/**
 * Custom ajax handler to make things easier.
 */
export function ajaxMultiparts(url,form,callback, request = 'post') {

  var tempFormData = new FormData(form);

  const config = { headers: {'Content-Type': 'multipart/form-data' }};

  var r = axios[request]; 

  r(url,tempFormData,config )
    
    .then(function (response) {

      callback(response.data,response.status);       

    });
};



/**
 * Get all inputs from form
 */

export function formHandler(form){

	var data = {};

    var inputs = form.querySelectorAll('input,textarea,select');

    for(var i=0;i<inputs.length;i++) {
       if(inputs[i].value!=='')
          data[inputs[i].name] = inputs[i].value.trim();
    }

    
    return data;

}

/**
 * React - Redux Bridge
 */

export function rBridge(component) {


    function mapStateToProps(state) { 

          return { user : state.user , guest : state.guest , userLoggedIn : state.userLoggedIn, booking : state.booking };
    } 

    function mapDispatchToProps(dispatch) { 

        return bindActionCreators(actions,dispatch);
     } 

    return connect(mapStateToProps,mapDispatchToProps)(component); 

}


/**
 * Get movie from hall
 */

export function getMovie(moviehall,id) {
    
    var movie = false;

    // console.log(moviehall);

    for(var i=0;i<moviehall.movies.length;i++) {

       // console.log(moviehall.movies[i].movie_id._id,id); 

       if(moviehall.movies[i].movie_id._id === id) {
          movie = moviehall.movies[i];
          return movie; // this is a movie object with time and screen things 
       } 

    }   

      
    return movie;
} 

export function logAnalytics() {

  ajax({ ping:window.Fandango_Analytics},function(response){ 

  },"/v1/api/analytics");

}