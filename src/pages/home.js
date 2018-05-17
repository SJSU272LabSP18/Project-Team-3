import React from "react";
import Slider from '../components/slider';
import {rBridge,ajax,formHandler} from './helpers';

import Moment from 'react-moment';
import Loader from '../components/loader';

class HomePage extends React.Component {

   state = {

      movies : [],
      genre : []

    }

  componentDidMount() {

    var obj = this;

  }



	render() {

    if( typeof this.state.movies === "undefined" && this.state.movies.length === 0)
      return <Loader height="550" />;

    var movies = [];


		return (

               <div className="home-page">


                    <div className="page-content">

                        <div className="container">
                            <div className="row home-row-1 padding-75">


                                  <div className="col-12 col-lg-2">



                                   </div>


                            </div>
                        </div>
                    </div>



               </div>

		);

	}

}

export default rBridge(HomePage);
