import React from "react";
import {ajax,ajaxMultiparts,rBridge} from '../commons/helpers';

import { ToastContainer, toast } from 'react-toastify';
import Moment from 'react-moment';
//import Ratings from "../components/ratings";

import Loader from '../components/loader';

class CrudList extends React.Component {

  	state = {
	  	entities: false,
	  	max :0 ,
	  	page : 1
  	}

    componentWillMount() { }

    componentDidMount() {

  		this.makeRequest({});

    }

    paginate = (e) => {

	    e.preventDefault();
	    this.makeRequest({ page : e.target.dataset.paginate });

	  }

	search1 = (e) => {

     	e.preventDefault();

    	var filter = { s : this.searchform1.querySelector('.searchInput').value };

    	this.clearButton.style.display = "block";

     	let obj = this;

        ajax({ filter : filter },function(response){

	        obj.setState({ entities : response.entities, page : response.page, max: response.max });

      	}, this.props.config.index_route ,"get");

  	}

  	resetPagination = (e) => {
  		e.preventDefault();
  		e.stopPropagation();

  		this.makeRequest({});
  	}

  	makeRequest = (params,filter =false) => {

		let obj = this;


  		if(this.props.config.filter !== "undefined")
  			params['filter'] = this.props.config.filter;

        ajax(params,function(response){

	        obj.setState({ entities : response.entities, page : response.page, max: response.max });

      	}, this.props.config.index_route ,"get");


  	}



	render() {

		var fields = this.props.config.fields;
		var pagination = [], cl ='';

		if(this.state.entities === false)
		return <Loader />;

	if(this.props.user.role === 'customer')
      return("You are not allowed to access this page !!");

	    for(var i=1;i<=this.state.max;i++) {

	      cl = ' page-item ';

	      if(this.state.page == i)
	        cl += ' active ';

	      pagination.push(<li key={'p'+i} className={cl}><a onClick={this.paginate} className="page-link" data-paginate={i} href={i}>{i}</a></li>);

	    }

		return (<div>


		 		<div className="row ">


                   <div className="col-12 col-lg-12">

                        <div className="fr-widget">
	                          <div className="fr-widget-body">

	                              <form className='search-form' ref={(f) => {this.searchform1 = f;} } onSubmit={this.search1} action="">
	                                    <div className="input-group">
	                                        <input type="text" className="form-control searchInput" name="s" placeholder="Search by name or skills" aria-label="Search by name or skills" aria-describedby="basic-addon2" />

	                                            <button className="btn btn-primary" type="submit"><svg  x="0px" y="0px" viewBox="0 0 16 16" width="16" height="16"><g className="nc-icon-wrapper" fill="#ffffff"><path fill="#ffffff" d="M7,14c-3.86,0-7-3.14-7-7s3.14-7,7-7s7,3.14,7,7S10.86,14,7,14z M7,2C4.243,2,2,4.243,2,7s2.243,5,5,5 s5-2.243,5-5S9.757,2,7,2z"></path> <path data-color="color-2" fill="#ffffff" d="M15.707,14.293L13.314,11.9c-0.411,0.529-0.885,1.003-1.414,1.414l2.393,2.393 C14.488,15.902,14.744,16,15,16s0.512-0.098,0.707-0.293C16.098,15.316,16.098,14.684,15.707,14.293z"></path> </g></svg></button>

	                                        	<button ref={(b) => {this.clearButton = b;} }  style={{display:"none"}} className=" reset-results btn btn-sm btn-outline-secondary" onClick={this.resetPagination} >Clear Results</button>
	                                    </div>
	                              </form>

	                          </div>

	                     </div>


                        <div className="fr-widget">

                            <div className="title">
                                <h3>{this.props.config.title}</h3>
                            </div>

                            <div className="fr-widget-body no-spacing">

                              	<table className="table table-hover align-items-center">
								    <thead>
								        <tr>
								            {Object.keys(fields).map(key => <th key={key} scope="col">{fields[key].replace('_',' ').toUpperCase()}</th>)}
								        </tr>
								    </thead>
								    <tbody>
								    	 {Object.keys(this.state.entities).map(key =>
								        	this.createRow(this.state.entities[key],fields,key)
								        )}
								    </tbody>
								</table>

								<nav aria-label="Page navigation">
		                          <ul className="pagination">

		                             {pagination}

		                          </ul>
		                        </nav>

                            </div>

                        </div>

                    </div>
                </div>

			</div>);

	}

	removeEntity = (event) => {

		event.preventDefault();

		 let obj = this;


		 var row_el = document.querySelector(event.target.dataset.row);

		 //console.log(row_el);

	      ajax({},function(response){


	      		row_el.remove();
	        	  toast.error(obj.props.config.post_type+" has been removed !", {
            position: toast.POSITION.TOP_CENTER
          });

	      }, this.props.config.delete_route+event.target.dataset.slug ,"delete");


	}

	cancelBooking = (event) => {

		event.preventDefault();

		 let obj = this;

	      ajax({},function(response){

	        	  toast.warning(obj.props.config.post_type+" has been cancelled ! Amount will be refunded in 7 working days.", {
            position: toast.POSITION.TOP_CENTER
          });

	      }, '/v1/api/cancelbooking/'+event.target.dataset.id ,"put");


	}


	createRow = (entity,fields,key) => {

		var rows = [];

		Object.keys(fields).map(fkey => {

			//console.log(fields[fkey]);

        	switch(fields[fkey]) {

        		case 'action-booking' :rows.push(
        						<td  className='button-panel clearfix' key={fkey}>
        							<a href="" data-row={"#r"+entity.slug+"-row"} data-id={entity._id} onClick={this.cancelBooking} className="btn btn-danger btn-sm ">
									    Cancel Booking
									</a>
									</td>
        						); break;

        		case 'mrevenue' :rows.push(
        						<td  className='button-panel clearfix' key={fkey}>
        							<a href={"/dashboard/movie/revenue/"+entity['slug']}  className="btn btn-info btn-sm ">
									    Revenue
									</a>
									</td>
        						); break;

        		case 'mhaction' :rows.push(
        						<td  className='button-panel clearfix' key={fkey}>
        							<a href={"/dashboard/moviehall/revenue/"+entity['slug']}  className="btn btn-info btn-sm ">
									    Revenue
									</a>
									</td>
        						); break;

        		case 'action' :
        						var moviehall_action = '';
        						if(this.props.config.post_type === 'moviehall') {
        							moviehall_action= (<a href={"/dashboard/moviehall/"+entity['slug']+"/addmovies"} className="btn btn-info btn-sm ">
									    Manage Movies </a>);
        						}
        						var delete_button = '';

        						if(this.props.config.post_type!='car') {
        							delete_button = (<a href="" data-row={"#r"+entity.slug+"-row"} data-slug={entity.slug} onClick={this.removeEntity} className="btn btn-danger btn-sm ">
									    Delete
									</a>);
        						}

        						rows.push(
        						<td  className='button-panel clearfix' key={fkey}>
        							<a href={"/dashboard/"+this.props.config.post_type+"/edit/"+entity.slug} className="btn btn-secondary btn-sm">Edit</a>

        							{delete_button}

									<a target="_BLANK" href={"/"+this.props.config.post_type+"/"+entity.slug+""} className="btn btn-info btn-sm ">
									    View
									</a>

									{moviehall_action}
									</td>
        						); break;
        		case 'avatar' :
        		case 'thumbnail' : rows.push(
        						<td key={fkey}> <img src={"/uploads/"+entity[fields[fkey]]} className="avatar avatar-lg mr-3"/></td>

        						); break;
        		//case 'rating' : rows.push(<td key={fkey}><Ratings ratings={entity[fields[fkey]]} /></td>); break;
        		case 'created_at' : rows.push(<td key={fkey}>{<Moment fromNow>{entity[fields[fkey]]}</Moment>}</td>); break;
        		case 'movie_date' :
        		case 'release_date' : rows.push(<td key={fkey}>{<Moment format="DD/MM/YYYY">{entity[fields[fkey]]}</Moment>}</td>); break;

        		case 'movie_name' :
        		var mv = '-';

        		if(typeof entity.movie !== "undefined")
        			mv = entity['movie'].name;

        		rows.push(<td key={'movie'-fkey}>{mv}</td>);

        		break;

				default : rows.push(<td key={fkey}>{entity[fields[fkey]]}</td>); break;

			}

       	});

		return (<tr key={key} id={"r"+entity.slug+"-row"} className="bg-white" scope="row">{rows}</tr>);

	}



}

export default rBridge(CrudList);
