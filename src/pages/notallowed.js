import React from "react";


class NotAllowed extends React.Component {
  


	render() {


		return (
                
               <div className="project-create-page">

                


                  <div className="page-content no-banner">
         
                      <div className="container">
                          <div className="row home-row-1 padding-75">
                            

                            <div className="col-12 col-lg-8">
                     
                            

                                <h1>You must login to view the follow page !</h1>
                                <a href="/login" className="btn">Login</a>  
                           </div> 


                     
                          </div>
                        </div>

                </div>
           </div> 
  

		);

	}

}

export default NotAllowed;

