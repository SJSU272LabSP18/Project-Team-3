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

      }, "/dashboard/termination","get");



  }


  updateForm = (e) => {
    e.preventDefault();

     let temp = this.form;

      ajax( formHandler(temp),(r) => {

        alert("Form submitted");

    },"/dashboard/termination/form","post")


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
          <div className="col-md-8 ">
            <h1 className="text-center" >Termination of Agreement</h1><br/><br/>
            <form className="bootstrap-form-with-validation" ref={(f) => {this.form = f;} } onSubmit={this.updateForm}>
            <h2 className="text-center"></h2>
            <div className="form-group"><label for="text-input" >How many days prior to lease termination must the tenant be informed?</label><input className="form-control" type="text" name="text-input" id="text-input" /></div>
            <div className="form-group"><label for="text-input">Reason for termination</label>
              <select className="form-control" id="terminate_reason" name="terminate_reason">
                <option>Early termination</option>
                <option>Delay in rent payment</option>
                <option>Criminal activity</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group"><label for="textarea-input">Description</label><textarea className="form-control" name="description" id="textarea-input"></textarea></div>

            <div className="form-group"><button className="btn btn-primary" type="submit">Submit</button></div>
          </form>

        </div>
      </div>

                              <div className="content" dangerouslySetInnerHTML={{__html: this.state.html}}></div>

                          </div>

                  </DashboardLayout>


		);

	}

}

export default rBridge(Dashboard);
