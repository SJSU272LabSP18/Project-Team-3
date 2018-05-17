import React from "react";

import DashboardLayout from "../../layout/dashboard_layout.js";
import {rBridge,ajax,formHandler} from '../../commons/helpers';
import Loader from '../../components/loader';
import CustomerWidget from './customer';
import AdminWidget from './admin';

class Dashboard extends React.Component {

  state = { html : ''  }


  componentDidMount() {

      let obj = this;
      setTimeout(function(){

         if(obj.props.guest){

              obj.props.history.push('/notallowed');
          }

      },3400);

      ajax({},function(response){

        obj.setState({ html : response });

      }, "/dashboard/dispute","get");



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

                          <div className="padding-50">

                          <div className="col-md-9">
          <div className="col-md-8 offset-md-2">
            <h1 className="text-center">Dispute Resolution</h1>
          </div>
          <div>
            <div className="form-group"><a href="/dashboard/dispute/form" className="btn btn-default">Create a new Issue</a></div>
            <div>
              <h3>Past Issues</h3>
              <li>Payment Dispute</li>
            </div>

          </div>
        </div>

                              <div className="content" dangerouslySetInnerHTML={{__html: this.state.html}}></div>

                          </div>

                  </DashboardLayout>


		);

	}

}

export default rBridge(Dashboard);
