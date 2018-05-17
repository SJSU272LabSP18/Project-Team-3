import React from "react";

import DashboardTabbedNav from "../components/dashboardTab.js";
import {rBridge} from '../commons/helpers';

class DashboardLayout extends React.Component {


	render() {

    if(this.props.guest === true)
      return("You are not allowed to access this page !!");

		return (

		 <div className="dashboard-page">

                  <DashboardTabbedNav  push={(typeof this.props.push === "undefined" ? null : this.props.push)} />


                  <div className="page-content dashboard-mode">

                      <div className="container-fluid">

                      		<div className={"admin-wrapper role-"+this.props.user.role}>
                       		{this.props.children}
                      		</div>

                      </div>

                   </div>
           </div>);

	}

}

export default rBridge(DashboardLayout);
