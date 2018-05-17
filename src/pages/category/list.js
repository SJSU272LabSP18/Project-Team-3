import React from "react";
import DashboardLayout from "../../layout/dashboard_layout.js";
import CrudList from '../../commons/crudList';

class UserList extends React.Component {
  
  	state = {

  		config : {   

	  	 	post_type : 'category',
	  	 	title : 'Models',
	  	 	index_route : '/v1/api/categories',
	  	 	delete_route : '/v1/api/category/',
	  	 	fields : ['id','name','make_name','action']
	  	 	
	  	 	}

	  }



    componentDidMount() {
  	 
  	 let obj = this;

    }
  

	render() {
		
		

		return (<div>
			<DashboardLayout>
				
				<div className="padding-50 ">
					<CrudList config={this.state.config} params={this.props.match.params} />
				</div>

			</DashboardLayout>		 	
			</div>);

	}

	

}

export default UserList;

