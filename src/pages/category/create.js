import React from "react";

import DashboardLayout from "../../layout/dashboard_layout.js";
import CrudForm from '../../commons/crudForm';

class UserCreate extends React.Component {
  
  state = {

  config : {   

      post_type : 'category',
      title : 'Category',
      create_route : '/v1/api/category',
      get_route : '/v1/api/category/',
      edit_route : '/v1/api/category/',
      sidebar_title : '',
      form_elements: {

        'main' : [

          { "label" : "Name" , "name" : "name" , "type" : "text" }, 
          { "label" : "Make Name" , "name" : "make_name" , "type" : "text" }, 

        ],

        'sidebar':[]

      }

     } 

  }

  componentWillMount() {

  }

	render() {

		return (
                
               <DashboardLayout>

						<CrudForm config={this.state.config} history={this.props.history} params={this.props.match.params} />	
                      
               </DashboardLayout>    
  

		);


	}
}

export default UserCreate;

