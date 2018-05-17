import React from "react";

import DashboardLayout from "../../layout/dashboard_layout.js";
import {rBridge,ajax,formHandler} from '../../commons/helpers';
import Loader from '../../components/loader';
import CustomerWidget from './customer';
import AdminWidget from './admin';

class Dashboard extends React.Component {

  state = {  }


  componentDidMount() {

      let obj = this;
      setTimeout(function(){

         if(obj.props.guest){

              obj.props.history.push('/notallowed');
          }

      },3400);


  }



	render() {

    if(typeof this.props.user._id === "undefined" )
      return <Loader />;

    var widget = '';

    if(this.props.user.role === 'admin')
        widget = ''
    else
        widget = <CustomerWidget />

		return (

               <DashboardLayout>

                          <div className="padding-75">


                          </div>

                  </DashboardLayout>


		);

	}

}

export default rBridge(Dashboard);
