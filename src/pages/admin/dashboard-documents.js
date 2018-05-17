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

      }, "/dashboard/documents","get");



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

                          <div className="col">
                    <div>
                        <div className="container">
                            <div className="cust_bloglistintro" >
                                <h2 className="text-center" className="h2">Documents List</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div  className="col-sm-4">
                            <h5>Current term</h5>
                                <a href="#">Lease Documents</a><br />
                                <a href="#">Insurance Documents</a><br />
                                <a href="#">Other documents</a>
                        </div>
                    </div>
                    <div className="row">
                        <div  className="col-sm-4">
                            <h5>Past documents</h5>
                                <a href="" >Lease Documents</a><br/>
                                <a href="#">Insurance Documents</a><br/>
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
