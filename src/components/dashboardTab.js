import React from "react";
import {rBridge,ajax} from '../commons/helpers';

class DashboardTabbedNavStub extends React.Component {

  constructor(props) {

    super(props);


    window.logFandango_Analytics = false;

  }

   logout = (e) => {
     e.preventDefault();

     ajax({},function(r){

        window.location.href=  '/logout';

     },'/logout')

  }


  rPush = (e) => {

     if(this.props.push) {

          e.preventDefault();
          this.props.push(e.target.dataset.href);

     }

  }

	render() {

  var admin_menu = null;

	if(this.props.guest === true)
		return null;

  if(this.props.user.role === 'admin') {
    admin_menu = (<div className="admin-sub-sidebar">
            <div className="inner-admin-sub-sidebar">

                  <h5>Users</h5>
                  <ul>
                    <li><a href="/dashboard/user/new">Add User</a></li>
                    <li><a href="/dashboard/users">List Users</a></li>
                  </ul>

            </div>
        </div>);


  }

    var loc = window.location.href.split('dashboard');
    loc = loc[loc.length - 1];

    console.log(loc);

		return (

                <div>

                <div className="admin-sidebar">
            <div className="inner-admin-sidebar">

                  <ul className="admin-menu">

                     <li>
                       <a href="/dashboard">


                          <span className="label">Dashboard</span>

                       </a>
                     </li>


                    <li>
                       <a href="/dashboard/maintenance">

                          <span className="label">Maintenance</span>

                       </a>
                     </li>

                     <li>
                       <a href="/dashboard/rent-information">

                          <span className="label">Rent Information</span>

                       </a>
                     </li>

                     <li>
                       <a href="/dashboard/documents">

                          <span className="label">Documents</span>

                       </a>
                     </li>

                     <li>
                       <a href="/dashboard/termination">

                          <span className="label">Termination</span>

                       </a>
                     </li>
                     <li>
                       <a href="/dashboard/dispute">

                          <span className="label">Dispute</span>

                       </a>
                     </li>




                     <li className={(loc.includes('profile') ) ? 'active' : ''}>
                       <a href={"/dashboard/profile/"+this.props.user.slug}>


                          <span className="label">Profile</span>

                       </a>
                     </li>



                     <li>
                       <a href="/logout" onClick={this.logout}>


                          <span className="label">Logout</span>

                       </a>
                     </li>

                  </ul>

            </div>
        </div>

        {admin_menu}


                </div>

		);

	}

}


const DashboardTabbedNav = rBridge(DashboardTabbedNavStub);

export default DashboardTabbedNav;
