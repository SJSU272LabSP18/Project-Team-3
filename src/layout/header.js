import React from "react";
import {rBridge,ajax,formHandler} from './helpers';

class Header extends React.Component {

  logout = (e) => {
     e.preventDefault();

     ajax({},function(r){

        window.location.href=  '/logout';

     },'/logout')

  }

	render() {

    let nav,logout_button = '';

    if(this.props.userLoggedIn === true) {


       var avatar;
      if(this.props.user.avatar === "" || typeof this.props.user.avatar === "undefined"){
        avatar = <span className="avatar avatar-sm">{this.props.user.first_name[0]}{this.props.user.last_name[0]}</span>
      } else {
        avatar = <img alt="avatar" src={"/uploads/"+this.props.user.avatar} className="avatar avatar-sm" />
      }

       nav = ( <div id="main-area"  className='clearfix'>

                           <div className="user-avatar">
                               {avatar}
                          </div>

                     <div className="greet">
                        <a href="/dashboard"><span>Hi, {this.props.user.first_name}</span> </a>
                     </div>


                 </div>    );
       logout_button = ( <a href="/logout" onClick={this.logout} className="logout-btn">Logout</a>);

    } else {

      nav = (

               <ul>

                                                 <li><a className="service" href="/register" style={{marginRight:"5px"}} >Register</a></li>
                                                 <li> <a href="/login">Login</a></li>


                                           </ul>


                );

    }

		return (

             <div className="jumbotron main-header header-wrapper">

              <div className="header-top clearfix">

                <div className="container">

                  <div className="row">
                <div className="header-left flt-l col-lg-3 clearfix">

                                    <div className="logo-wrapper"><h1><a href="/">Phoenix</a></h1></div>

                            </div>




                                <div className="header-right col-lg-9 flt-r clearfix">
                                    <div className="login-wrapper">
                                          {nav}

                                          {logout_button}


                                         </div>


                                </div>
                            </div>

                    </div>

                    </div>


                    <div className="header-main">

                      <div className="container">

                        <div className="row">
                                    <div className="header-left col-lg-6 clearfix">

                                                    <div className="nav-wrapper">

                                                    <div className="gls_wrapper">
                                                        <a href="http://blockchain.org"><div className="category_txt"><span>Powered By BLOCKCHAIN</span></div></a>
                                                </div>

                                        </div>

                                                            <div className="header-right col-lg-6 clearfix">

                                    <div className="admin-rating-wrapper">





                                </div>

                            </div>

                                        </div>






                    </div>

              <div className="menu-wrapper">

                    </div>




       </div>


              </div></div>

                 );

	}

}



export default rBridge(Header);
