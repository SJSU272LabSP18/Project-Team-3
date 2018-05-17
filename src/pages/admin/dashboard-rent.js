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

      }, "/dashboard/rent","get");



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
            <h1 className="text-center">Rent</h1>
          </div>
          <div>
              <div >
                <div className="form-group"><label for="text-input" >Current Amount Due: </label><font >$879.67</font></div>
                <div className="form-group"><label for="text-input" >Due Date: </label><font>April 30, 2018</font></div>
                <div className="form-group">
                    <a href="/dashboard/rent/form" className="btn btn-default">Make a Payment</a>
                    </div>
                    <div className="form-group">
                    <a href="/dashboard/renew/form" className="btn btn-default">Renew Your Lease</a>
              </div>

              </div>


              <div>
                <h6>Based on Lease Document:</h6>
                Your Monthly rent is $870. You can negotiate better rate at the end of the current lease (December 31, 2018).
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
