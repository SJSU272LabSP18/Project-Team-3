import React from "react";
//import Ratings from "./ratings";

import {ajax} from '../commons/helpers';
import Loader from '../components/loader';

class Slider extends React.Component {

  state = {

      movies : []

    }

  componentWillMount() {

    var obj = this;

    ajax({ perPage : 6 , filter:{  } },function(response){


          obj.setState({ movies : response.entities  });

          setTimeout(function(){

              window.mainCarousel.show().flickity('resize');

          },100);

        },"/v1/api/movies","get");

  }

	render() {

    if( typeof this.state.movies === "undefined" && this.state.movies.length === 0)
      return <Loader height="550px" />;

    var slides = [] , cl = 'small-slide';

    Object.keys(this.state.movies).map(key => {

         cl = 'small-slide';

        if(parseInt(key) === 0 || parseInt(key) === 3)
            cl = 'big-slide';

        var genre = [];
        var m = this.state.movies[key];

        Object.keys(m.genre).map(k => { genre.push(m.genre[k].name)  });


        slides.push( <div key={"sll"+key} className={cl} style={{ background:"url(/uploads/"+m.cover+") top left no-repeat","backgroundSize":"cover"}}>
                      <div className="caption-wrap clearfix">
                            <img src={"/uploads/"+m.thumbnail} alt="images" />

                            <div className="text">
                                <h2>{m.name}</h2>
                                <h6 className="meta">{m.movie_rating} | {m.movie_length} | {genre.join(',')}</h6>



                                <div className="desc">A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.</div>
                                <a href={"/selecthall/"+m.slug} className="btn btn-primary">Book Now</a>

                            </div>
                      </div>
                  </div>);

    });

		return (


				<div className="slider-area">

        <div className="main-carousel">

            <div className="carousel-cell">

                <div className="big-block clearfix">

                 {slides[0]}

                </div>


                <div className="small-blocks-holder">

                        {slides[1]}


                        {slides[2]}


                      </div>


                </div>


                 <div className="carousel-cell">

                <div className="big-block clearfix">

                 {slides[3]}

                </div>


                <div className="small-blocks-holder">

                        {slides[4]}


                        {slides[5]}


                      </div>


                </div>

        </div>

    </div>

		);

	}

}

export default Slider;
