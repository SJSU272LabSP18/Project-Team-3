import React from "react";
import {ajax,rBridge,logAnalytics} from '../commons/helpers';

class Footer extends React.Component {

  state = {

    genre : []
  }

  componentDidMount() {


   }


  render() {





		return (


              <footer>


        Copyright 2018 Phoenix


    </footer>


              );

	}

}

export default rBridge(Footer);
