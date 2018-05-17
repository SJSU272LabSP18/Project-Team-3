import React from "react";
import {ajax,formHandler} from '../commons/helpers';

import { ToastContainer, toast } from 'react-toastify';

class RegisterAdminForm extends React.Component {


registerUser = (event) => {

    event.preventDefault();

    var html = this.submitButton.innerHTML, obj = this.submitButton;
    obj.innerHTML = "Signing up...";

    let temp = this.form;

    ajax( formHandler(temp),(r) => {

         obj.innerHTML = html;

        if("error" in r) {

            alert('Already registered')

        }

        if(typeof r.id !== "undefined") {

          temp.reset();
          alert("Admin registered!")

        }

    },"/v1/api/user")


  }

	render() {


		return (


      <section className="py-xl bg-cover bg-size--cover" >
        <span className="mask  alpha-6"></span>
        <div className="container d-flex align-items-center no-padding">
          <div className="col">
            <div className="row justify-content-center">
              <div className="col-lg-7">
                <div className="card  ">
                  <div className="card-body">

                    <h4 className="heading h3  pt-3 pb-5">Register now</h4>

                    <div ref={(el) => {this.msg = el;} } style={{display:"none"}} className="alert alert-success alert-dismissible fade show" role="alert">
                        <span className="alert-inner--icon"><i className="fas fa-check"></i></span>
                        <span className="alert-inner--text">You have registered succsefully <a href="/login" className="white-text">Login from here</a> !</span>

                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <form ref={(f) => {this.form = f;} } onSubmit={this.registerUser} action="" className="fr-row-20">

                                  <input type="hidden" value="admin" name="role" />


                                  <div className="row">
                                  <div className="col mb-3">
                                  <label >Enter Firstname</label>
                                  <input type="text" required className="form-control" name="first_name" />
                                  </div>

                                  <div className="col mb-3">
                                  <label >Enter Lastname</label>
                                  <input type="text" required className="form-control" name="last_name" />
                                  </div>

                                  </div>



                                   <div className="row">
                                  <div className="col mb-3">
                                  <label >Enter Email</label>
                                  <input type="email" required className="form-control" name="email" />
                                  </div>


                                  </div>



                                  <div className="row mb-4">
                                  <div className="col">
                                  <label >Enter password</label>
                                  <input type="password" className="form-control" name="password" />
                                  </div>
                                  </div>

                                  <div className="row">
                                  <div className="col">
                                  <button className='btn btn-primary' ref={(f) => {this.submitButton = f;}} type="submit">Register <i className="fas fa-angle-right"></i></button>
                                  </div>
                                  </div>

                               </form>


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
     </section>

		);

	}

}

export default RegisterAdminForm;
