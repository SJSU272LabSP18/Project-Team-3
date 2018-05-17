import React from "react";
import {rBridge,ajax,formHandler} from '../../commons/helpers';

import Moment from 'react-moment';
import Loader from '../../components/loader';

class Category extends React.Component {

   state = {

      categories:[],
      max :0 ,
      page : 1,
      category_slug : '',
      searching : false

    }

  componentDidMount() {

    var obj = this,filter = {};



     ajax({ perPage : 100 },function(response){

        obj.setState({ categories : response.entities });

        if( typeof obj.props.match.params!=="undefined" && "slug" in obj.props.match.params ) {


            for(var i=0;i<response.entities.length;i++) {

                if(response.entities[i].slug == obj.props.match.params.slug) {
                   filter = { categories : response.entities[i]._id };
                   obj.setState({ category_slug : response.entities[i]._id });
                   break;
                }

            }
        }


              obj.makeRequest({ filter });

     },"/v1/api/categories","get");




  }

  makeRequest = (params) => {

      let obj = this;

      if(this.state.category_slug !== '') {
        if(typeof params.filter === "undefined")
           params['filter'] = {};

        params.filter['category'] = this.state.category_slug;
      }



    }


  paginate = (e) => {

      e.preventDefault();
      this.makeRequest({ page : e.target.dataset.paginate });

    }

  search = (e) => {

      e.preventDefault();

      var filter = { s : this.searchform.querySelector('.s').value };

      this.setState({ searching:true });
      this.clearButton.style.display = "block";
      this.makeRequest({ filter : filter });

    }

    resetPagination = (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.searchform.reset(0);
      this.makeRequest({});
    }

  category = () => {

    var g= [],cl='',obj=this;

    if( typeof obj.props.match.params.slug==="undefined" )
      cl = 'active';

    g.push(<li key='g-all' className={cl}><a href="/category">All</a></li>);

    Object.keys(this.state.category).map( s => {

      cl = '';

      if( typeof obj.props.match.params!=="undefined" && "slug" in obj.props.match.params && this.state.category[s].slug ===  obj.props.match.params.slug)
          cl = 'active';

       g.push(<li className={cl} key={'g-'+this.state.category[s].slug}><a href={'/category/'+this.state.category[s].slug}>{this.state.category[s].name}</a></li>);

    });

    return g;
  }



  render() {

    if( typeof this.state.movies === "undefined" || this.state.movies.length === 0)
      return <Loader height="550px" />;

    var movies = [];



    var pagination = [], cl ='';

    for(var i=1;i<=this.state.max;i++) {

            cl = ' page-item ';

            if(this.state.page == i)
              cl += ' active ';

            pagination.push(<li key={'p'+i} className={cl}><a onClick={this.paginate} className="page-link" data-paginate={i} href={i}>{i}</a></li>);

          }

   if(this.state.searching === true) {
       movies = <Loader height="300px" />;
    }

    return (

               <div className="home-page">

                   <div className="bookticket-banner-area"></div>

                    <div className="page-content">

                        <div className="container">
                            <div className="row home-row-1 padding-75">


                                  <div className="col-12 col-lg-2">


                                       <div className="sidebar-wrap">
                                            <div className="sidebar-title">
                                              <h3>All Categories</h3>
                                           </div>

                                           <div className="sidebar-body">
                                             <ul>
                                               {this.category()}
                                             </ul>
                                           </div>

                                       </div>

                                   </div>


                                   <div className="col-12 col-lg-10">





                                         <div className="section-title category-title">
                                            <h2>Showing all movies</h2>
                                         </div>

                                         <div className="fr-widget">
                                              <div className="fr-widget-body">

                                                  <form className='search-form' ref={(f) => {this.searchform = f;} } onSubmit={this.search} action="">
                                                        <div className="input-group">
                                                            <input type="text" className="form-control s" placeholder="Search..." aria-label="Search by name or skills" aria-describedby="basic-addon2" />

                                                                <button className="btn btn-primary" type="submit"><svg  x="0px" y="0px" viewBox="0 0 16 16" width="16" height="16"><g className="nc-icon-wrapper" fill="#ffffff"><path fill="#ffffff" d="M7,14c-3.86,0-7-3.14-7-7s3.14-7,7-7s7,3.14,7,7S10.86,14,7,14z M7,2C4.243,2,2,4.243,2,7s2.243,5,5,5 s5-2.243,5-5S9.757,2,7,2z"></path> <path data-color="color-2" fill="#ffffff" d="M15.707,14.293L13.314,11.9c-0.411,0.529-0.885,1.003-1.414,1.414l2.393,2.393 C14.488,15.902,14.744,16,15,16s0.512-0.098,0.707-0.293C16.098,15.316,16.098,14.684,15.707,14.293z"></path> </g></svg></button>

                                                              <button ref={(b) => {this.clearButton = b;} }  style={{display:"none"}} className=" reset-results btn btn-sm btn-outline-secondary" onClick={this.resetPagination} >Clear Results</button>
                                                        </div>
                                                  </form>

                                              </div>

                                         </div>



                                         <div className="cards-section category-section">

                                             <div className="row">

                                                {movies}


                                              </div>
                                        </div>

                                        <nav aria-label="Page navigation">
                                          <ul className="pagination">

                                             {pagination}

                                          </ul>
                                        </nav>

                                  </div>


                            </div>
                        </div>
                    </div>



               </div>

    );

  }

}

export default rBridge(Category);
