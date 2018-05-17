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

  updateForm = (e) => {
    e.preventDefault();

     let temp = this.form;

      ajax( formHandler(temp),(r) => {

        alert("Form submitted");

    },"/dashboard/maintenance/form","post")


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
            <h1 className="text-center">Maintainence</h1>
          </div>
          <form ref={(f) => {this.form = f;} } onSubmit={this.updateForm} >

            <div class="form-group">
              <label for="typeofProblem">Type of Maintenance Problem</label>
              <select className="form-control" name="typeofProblem" id="typeofProblem">
                <option>Electrical</option>
                <option>Heating</option>
                <option>Air Conditioning</option>
                <option>Dryer Vent</option>
              </select>
            </div>
            <div className="form-group">
              <label for="whereofProblem">Location of the Problem</label>
              <select className="form-control" name="whereofproblem" id="whereofProblem">
                <option>Bedroom</option>
                <option>Bathroom</option>
                <option>Kitchen</option>
              </select>
            </div>
            <div className="form-group">
              <label for="descriptionOfProblem">What is the maintenance problem? Please be as specific as possible. What is happening?
How is the item broken or not working correctly?</label>
              <textarea name="description" className="form-control" id="descriptionOfProblem" rows="3"></textarea>
            </div>

            <fieldset className="form-group">
              <label>Is it a repeated Problem?</label>
              <div clasclassNames="form-check">
                <label className="form-check-label">
        <input type="radio" className="form-check-input" name="options" id="optionYes" value="option1" />
        Yes
      </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
        <input type="radio" className="form-check-input" name="options" id="optionNo" value="option2" />
        No
      </label>

              </div>
            </fieldset>

            <button type="submit" classNames="btn btn-primary" >Submit</button>
          </form>
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
