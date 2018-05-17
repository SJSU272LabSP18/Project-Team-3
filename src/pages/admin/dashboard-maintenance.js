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

      }, "/dashboard/maintenance","get");



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

                              <div className="container">
                                    <div className="row">
                                    <div className="col-md-9">
          <div className="col-md-8 offset-md-2">
            <h1 className="text-center">Maintenance</h1>
          </div>
          <div>
            <div className="form-group"><a href="/dashboard/maintenance/form" className="btn btn-default">Create a new Request</a></div>
            <div>
              <h3>Past Requests</h3>
              <li>Power Outlet not working</li>
            </div>

          </div>
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
