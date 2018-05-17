import React from "react";
import {rBridge,ajax,formHandler} from '../../commons/helpers';

import moment from 'moment';

class CustomWidge extends React.Component {

  state = {
    transactions:[],
    max :0 ,
    page : 1,
       }


  componentDidMount() {

      let obj = this;
      setTimeout(function(){

         if(obj.props.guest){

              obj.props.history.push('/notallowed');
          }

      },3400);




  }



	render() {



		return (

        <div>


        </div>
		);

	}

}

export default rBridge(CustomWidge);
