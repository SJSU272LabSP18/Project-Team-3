import React from "react";
import DashboardLayout from "../../layout/dashboard_layout.js";
import CrudList from '../../commons/crudList';
import {rBridge,ajax,formHandler} from '../../commons/helpers';

import Moment from 'react-moment';

class UserProfile extends React.Component {

  	state = {

  		user : {}

	  }

	componentWillMount() {

		var obj = this;

		ajax({},function(response){

			console.log(response);

       		obj.setState({ user : response });

      	},"/v1/api/user","get");

	}


    componentDidMount() {

  	 let obj = this;

    }


	render() {

		if(typeof this.state.user.id === "undefined")
			return ("loading...");

		var avatar , u = this.state.user;
	      if(this.state.user.avatar === "" || typeof this.state.user.avatar === "undefined"){
	        avatar = <span className="">{this.state.user.first_name[0]}{this.state.user.last_name[0]}</span>
	      } else {
	        avatar = <img alt="avatar" src={"/uploads/"+this.state.user.avatar} className="" />
	      }


		return (
			 <div className="page">

			 		<div className="banner-area" style={{ "backgroundImage":"url(https://images.unsplash.com/photo-1524303676975-5989d34c6854?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=313a3c6819248cf686124e9caa8a9846&auto=format&fit=crop&w=1946&q=80)" }}></div>

                    <div className="page-content">

                        <div className="container">
                            <div className="row home-row-1 padding-75">



                                  <div className="col-12 col-lg-4">

                                  	<div className="profile-avatar">
                                  				{avatar}
                                  	</div>


                                     <div className="card">
							            <div className="card-header py-4">
							                <h4 className="heading h5 font-weight-500 mb-2">{u.first_name+" "+u.last_name}</h4>
							                <h5>Joined <Moment fromNow>{u.createdAt}</Moment>.</h5>
							            </div>


							            <div className="list-group">
							                <ul className="list-group list-group-flush">
							                    <li className="list-group-item"><strong>City</strong> : {u.city}</li>
							                    <li className="list-group-item"><strong>State</strong> : {u.state}</li>
							                    <li className="list-group-item"><strong>Zipcode</strong> : {u.zipcode}</li>

							                </ul>
							            </div>
							        </div>

                                   </div>


                                   <div className="col-12 col-lg-8">


                                         <div className="cards-section">

                                             <div className="row">

                                                 	<div className="fr-widget user-profile-widget">

						                                <div className="title">
						                                    <h3>About</h3>
						                                </div>

						                                <div className="fr-widget-body">{u.about}</div>
													</div>

                                              </div>
                                        </div>

                                  </div>


                            </div>
                        </div>
                    </div>



               </div>   );

	}



}

export default UserProfile;
