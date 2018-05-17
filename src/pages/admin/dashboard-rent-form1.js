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

      updateForm = (e) => {
    e.preventDefault();

     let temp = this.form;

      ajax( formHandler(temp),(r) => {

        alert("Rent paid");

    },"/dashboard/rent/form","post")


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
            <h1 className="text-center">Pay Rent</h1>
          </div>
          <form className="bootstrap-form-with-validation" ref={(f) => {this.form = f;} } onSubmit={this.updateForm}>
            <h2 className="text-center"></h2>
            <div className="form-group"><label for="text-input" >Month</label><input className="form-control" type="text" name="month" id="text-input" /></div>

            <div className="form-group"><label for="text-input" >Amount</label><input className="form-control" type="text" name="amount" id="text-input" /></div>





            <div className="form-group"><button className="btn btn-primary" type="submit">Submit</button></div>
          </form>
        </div>

                              <div className="content" dangerouslySetInnerHTML={{__html: this.state.html}}></div>

                          </div>

                  </DashboardLayout>


    );

  }

}

export default rBridge(Dashboard);
