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

        alert("Form submitted");

    },"/dashboard/dispute/form","post")


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
          <form className="bootstrap-form-with-validation" ref={(f) => {this.form = f;} } onSubmit={this.updateForm}>
            <h2 className="text-center"></h2>
            <div className="form-group"><label for="text-input" >Subject</label><input className="form-control" type="text" name="text-input" id="text-input" /></div>
            <div className="form-group"><label for="text-input">Dispute Topic</label>
              <select className="form-control" name="disputeTopic" id="disputeTopic">
                <option>Payment Resolution</option>
                <option>Lease details</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group"><label for="textarea-input">Description</label><textarea className="form-control" name="description" id="textarea-input"></textarea></div>
            <fieldset className="form-group">
              <label>Is it a first time occurance?</label>
              <div className="form-check">
                <label className="form-check-label"><input type="radio" className="form-check-input" name="options" id="optionYes" value="option1" />Yes</label>
                <label className="form-check-label" ><input type="radio" className="form-check-input" name="options" id="optionNo" value="option2" />No</label>
              </div>
            </fieldset>
            <div className="form-group"><label for="search-input">Search Lease aggreement</label>
            <div className="input-group">
              <div className="input-group-prepend"><span className="input-group-text"> <i className="fa fa-search"></i></span></div><input className="form-control" type="search" name="search" id="search-input" /></div>
              </div>
            <div className="form-group"><label for="file-input">Upload supporting Documents </label>
              <textarea name="supporting_docs" id="" cols="30" rows="10"></textarea>
            </div>
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
