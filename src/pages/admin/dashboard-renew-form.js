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


  }

      updateForm = (e) => {
    e.preventDefault();

     let temp = this.form;

      ajax( formHandler(temp),(r) => {

        alert(r);

    },"/dashboard/renew/form","post")


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
            <h1 className="text-center">Renew your lease</h1>
          </div>
          <form className="bootstrap-form-with-validation" ref={(f) => {this.form = f;} } onSubmit={this.updateForm}>

            <h2 className="text-center"></h2>
            <div className="form-group"><label for="text-input" >Rent Rate</label><input className="form-control" type="text" value="0.05" name="rent_rate" id="text-input" /></div>

            <div className="form-group"><label for="text-input" >Deposit Rate</label><input className="form-control" type="text" value="0.4" name="deposite_rate" id="text-input" /></div>

              <div className="form-group"><label for="text-input" >Notice Advance Day</label><input className="form-control" type="text" value="3.0" name="notice_advance_day" id="text-input" /></div>

            <div className="form-group"><label for="text-input" >Pest control frequency</label><input className="form-control" type="text" value="1.0" name="pest_control_frequency" id="text-input" /></div>

            <div className="form-group"><label for="text-input" >Maintenance coverage</label><input className="form-control" type="text" value="1.0" name="maintenance_coverge" id="text-input" /></div>

          <div className="form-group"><label for="text-input" >Termination cost</label><input className="form-control" type="text" value="0.3" name="termination_cost" id="text-input" /></div>



            <div className="form-group"><button className="btn btn-primary" type="submit">Check</button></div>
            <div className="form-group"><button className="btn btn-primary" onClick={(e) => alert('Lease Renewed') } type="button">Renew</button></div>
          </form>
        </div>

                              <div className="content" dangerouslySetInnerHTML={{__html: this.state.html}}></div>

                          </div>

                  </DashboardLayout>


    );

  }

}

export default rBridge(Dashboard);
